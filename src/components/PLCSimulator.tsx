import React, { useState, useEffect, useRef } from "react";
import { Play, Square, AlertOctagon, Terminal, Gauge, RefreshCw, Layers, ShieldAlert, Sliders } from "lucide-react";

interface LogLine {
  time: string;
  type: "info" | "warn" | "error" | "success";
  text: string;
}

export const IndustrialPLCSimulator: React.FC = () => {
  // Simulator states
  const [plcPower, setPlcPower] = useState<boolean>(true);
  const [systemOn, setSystemOn] = useState<boolean>(false);
  const [conveyorRunning, setConveyorRunning] = useState<boolean>(false);
  const [emergencyActive, setEmergencyActive] = useState<boolean>(false);
  const [motorSpeedHz, setMotorSpeedHz] = useState<number>(35); // 0-60 Hz (Standard frequency)
  const [siloLevelPct, setSiloLevelPct] = useState<number>(45); // 0-100%
  const [tempCelsius, setTempCelsius] = useState<number>(42);

  const [logs, setLogs] = useState<LogLine[]>([
    { time: "20:53:11", type: "info", text: "CLP Siemens S7-1200 CPU 1214C Inicializado com sucesso." },
    { time: "20:53:12", type: "success", text: "Rotina OB1 [Varredura Principal] carregada com ciclo médio de 4ms." },
    { time: "20:53:15", type: "info", text: "Rede de Comunicação PROFINET ativa - Link Ok." }
  ]);

  const logScrollRef = useRef<HTMLDivElement>(null);

  // Generate logs helper
  const addLog = (text: string, type: "info" | "warn" | "error" | "success" = "info") => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs(prev => [...prev.slice(-40), { time: timeStr, type, text }]);
  };

  // Scroll logs to bottom
  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle thermal and sensor dynamics
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (plcPower && systemOn && conveyorRunning && !emergencyActive) {
      interval = setInterval(() => {
        // Temperature fluctuates with speed
        setTempCelsius(prev => {
          const targetTemp = 32 + (motorSpeedHz * 0.7);
          const diff = targetTemp - prev;
          const fluctuation = (Math.random() - 0.5) * 0.4;
          return Number((prev + diff * 0.15 + fluctuation).toFixed(1));
        });

        // Silo slowly drains if conveyor runs
        setSiloLevelPct(prev => {
          if (prev > 0) {
            const nextVal = Math.max(0, prev - (motorSpeedHz / 15) * 0.2);
            if (nextVal <= 10 && prev > 10) {
              addLog("SENSOR DE NÍVEL BAIXO ATIVADO (I:0/2) [Aviso: Silo Vazio]", "warn");
            }
            return Number(nextVal.toFixed(1));
          }
          return 0;
        });
      }, 800);
    } else if (plcPower) {
      // Natural thermal dispersal
      interval = setInterval(() => {
        setTempCelsius(prev => {
          if (prev > 26) return Number((prev - 0.3).toFixed(1));
          return prev;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [plcPower, systemOn, conveyorRunning, emergencyActive, motorSpeedHz]);

  const togglePower = () => {
    if (plcPower) {
      setPlcPower(false);
      setSystemOn(false);
      setConveyorRunning(false);
      setLogs([{ time: "00:00:00", type: "error", text: "CPU desligada. Painel desenergizado." }]);
    } else {
      setPlcPower(true);
      setLogs([
        { time: "00:00:01", type: "info", text: "Partida a frio do barramento interno de I/O." },
        { time: "00:00:02", type: "success", text: "Relés de segurança OK. Pronto para ciclo de varredura." }
      ]);
    }
  };

  const handleStartSystem = () => {
    if (!plcPower || emergencyActive) return;
    setSystemOn(true);
    addLog("SISTEMA ON - Bobina M0.0 Ativa (Habilita Comando)", "success");
  };

  const handleStopSystem = () => {
    if (!plcPower) return;
    setSystemOn(false);
    setConveyorRunning(false);
    addLog("SISTEMA OFF - Painel em modo isolado (M0.0 Resetada)", "info");
  };

  const handleStartConveyor = () => {
    if (!plcPower || !systemOn || emergencyActive) {
      if (!systemOn) addLog("Erro: Sistema de Comando (ON) precisa estar ativo.", "error");
      return;
    }
    setConveyorRunning(true);
    addLog(`PARTIDA MOTOR ESTEIRA DE VOLTA - Frequência de VFD definida: ${motorSpeedHz}Hz`, "success");
    addLog("Saída Digital O:0/1 [Contator K1] Acionado.", "info");
  };

  const handleStopConveyor = () => {
    if (!plcPower) return;
    setConveyorRunning(false);
    addLog("ESTEIRA DESLIGADA - Parada controlada acionada. (O:0/1 Reset)", "info");
  };

  const handleEmergencyBtn = () => {
    if (!plcPower) return;
    setEmergencyActive(true);
    setConveyorRunning(false);
    setSystemOn(false);
    addLog("!!! BOTÃO DE EMERGÊNCIA ACIONADO !!! Interrupção imediata via Relé de Segurança NR12.", "error");
    addLog("Alimentação de Força do Contator K1 e K2 cortados fisicamente.", "error");
  };

  const handleResetEmergency = () => {
    setEmergencyActive(false);
    addLog("Rearme do circuito de segurança efetuado. Aguardando reenergização da bancada.", "success");
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 xl:grid-cols-12 gap-6" id="industrial-automation-panel">
      {/* Simulation graphics room (Col 1) */}
      <div className="xl:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5" id="sim-scene-panel">
        <div id="sim-scene-header">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider font-mono block mb-1">Cenário Físico Simulado</span>
          <h4 className="text-sm font-bold text-brand-navy flex items-center gap-1.5 border-b border-slate-200 pb-2">
            <Layers className="w-4 h-4 text-brand-orange" />
            Silo & Esteira de Alimentação
          </h4>
        </div>

        {/* Dynamic graphics drawing (Pure components and animations) */}
        <div className="my-6 flex flex-col items-center justify-around h-60 relative bg-white border border-slate-200/60 rounded-xl shadow-inner p-4" id="sim-rendering-box">
          
          {/* Fumes/Thermal indicator when temp is high */}
          {tempCelsius > 55 && plcPower && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-1 animate-pulse" id="silo-steam">
              <span className="w-1.5 h-6 bg-slate-300/30 rounded-full blur-[2px]" />
              <span className="w-1.5 h-6 bg-slate-300/40 rounded-full blur-[3px]" />
            </div>
          )}

          {/* Silo graphic (Storage Tank) */}
          <div className="w-24 border-2 border-slate-400 rounded-t-lg bg-slate-100 relative overflow-hidden" style={{ height: "90px" }} id="tank-graphic">
            {/* Liquid/Silo content level */}
            <div
              className={`absolute bottom-0 left-0 w-full transition-all duration-700 ${
                siloLevelPct > 75 ? "bg-amber-600/80" : siloLevelPct > 20 ? "bg-brand-orange/60" : "bg-red-500/60"
              }`}
              style={{ height: `${siloLevelPct}%` }}
              id="tank-fluid"
            />
            {/* Capacitive level markers */}
            <div className="absolute top-2 right-1 flex items-center gap-1" id="marker-high">
              <span className={`w-2 h-2 rounded-full ${siloLevelPct >= 80 && plcPower ? "bg-emerald-500 animate-ping" : "bg-slate-300"}`} />
              <span className="text-[8px] font-mono text-slate-500">Nível Alto</span>
            </div>
            <div className="absolute bottom-2 right-1 flex items-center gap-1" id="marker-low">
              <span className={`w-2 h-2 rounded-full ${siloLevelPct <= 10 && plcPower ? "bg-red-500 animate-ping" : "bg-slate-300"}`} />
              <span className="text-[8px] font-mono text-slate-500">Mínimo</span>
            </div>
          </div>

          {/* Fall stream if conveyor is running */}
          {conveyorRunning && siloLevelPct > 0 && plcPower && !emergencyActive ? (
            <div className="w-3 bg-amber-600/50 animate-bounce" style={{ height: "20px" }} id="flow-stream" />
          ) : (
            <div style={{ height: "20px" }} id="flow-stream-empty" />
          )}

          {/* Conveyor graphic */}
          <div className="w-full max-w-[240px] border-2 border-slate-600 rounded-full bg-slate-300 h-8 relative flex items-center justify-between px-3 overflow-hidden shadow" id="conveyor-graphic">
            {/* Spinning rollers */}
            <span className={`w-6 h-6 rounded-full border border-slate-500 bg-slate-400 flex items-center justify-center font-bold text-slate-600 text-[10px] ${conveyorRunning && plcPower ? "animate-spin" : ""}`} id="roller-1">↻</span>
            
            {/* Box package moving on conveyor line */}
            {conveyorRunning && plcPower && (
              <div className="h-5 w-8 bg-brand-navy border border-slate-600 rounded text-[9px] text-white flex items-center justify-center font-mono font-bold animate-pulse" id="conveyor-box">
                PAC
              </div>
            )}
            
            <span className={`w-6 h-6 rounded-full border border-slate-500 bg-slate-400 flex items-center justify-center font-bold text-slate-600 text-[10px] ${conveyorRunning && plcPower ? "animate-spin" : ""}`} id="roller-2">↻</span>
          </div>
        </div>

        {/* Telemetry diagnostics cards */}
        <div className="grid grid-cols-2 gap-2" id="scene-telemetry-grid">
          <div className="bg-white border border-slate-200 p-2.5 rounded-lg" id="telemetry-silo">
            <span className="text-[10px] font-bold text-slate-400 block" id="telemetry-silo-label">NÍVEL SILO</span>
            <span className="text-sm font-mono font-bold text-brand-navy" id="telemetry-silo-val">{siloLevelPct}%</span>
          </div>
          <div className="bg-white border border-slate-200 p-2.5 rounded-lg" id="telemetry-temp">
            <span className="text-[10px] font-bold text-slate-400 block" id="telemetry-temp-label">MOTO-REDUZ TEMP</span>
            <span className={`text-sm font-mono font-bold ${tempCelsius > 65 ? "text-red-500 font-extrabold animate-pulse" : "text-brand-navy"}`} id="telemetry-temp-val">
              {tempCelsius}°C
            </span>
          </div>
        </div>
      </div>

      {/* Control console IHM (Col 2) */}
      <div className="xl:col-span-5 bg-slate-900 text-white rounded-2xl p-5 relative border-t-4 border-brand-orange shadow-md flex flex-col justify-between" id="con-ihm-panel">
        
        {/* Console Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800" id="ihm-header">
          <div id="ihm-header-left">
            <h5 className="text-xs uppercase font-bold text-brand-orange tracking-widest font-mono" id="ihm-header-sub">Interfaces de Comando - IHM</h5>
            <h4 className="text-base font-bold text-white tracking-tight" id="ihm-header-main">Bancada de Teste CLP</h4>
          </div>
          {/* CLP CPU power toggle */}
          <button
            id="btn-switch-clp"
            onClick={togglePower}
            className={`text-[10px] px-2.5 py-1 rounded font-mono font-bold border transition-colors cursor-pointer ${
              plcPower
                ? "bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900"
                : "bg-red-950 text-red-300 border-red-800 hover:bg-red-900"
            }`}
          >
            {plcPower ? "CPU: LIGADA" : "CPU: DESLIGADA"}
          </button>
        </div>

        {/* I/O Indicators LEDs matrix */}
        <div className="py-4 grid grid-cols-2 gap-3" id="io-status-panel">
          {/* Inputs section */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800" id="sub-inputs">
            <span className="text-[9px] font-mono text-slate-400 font-bold block mb-2" id="lbl-sub-inputs">ENTRADAS DIAGNÓSTICAS (DI)</span>
            <div className="space-y-1.5 text-[10px] font-mono" id="inputs-leds">
              <div className="flex items-center gap-1.5" id="led-in-m00">
                <span className={`w-2.5 h-2.5 rounded-full ${plcPower && systemOn ? "bg-emerald-400 shadow-green-400 shadow-sm" : "bg-slate-700"}`} />
                <span className="text-slate-300 font-bold">I:0/0</span>
                <span className="text-slate-400 truncate">(Comando ON)</span>
              </div>
              <div className="flex items-center gap-1.5" id="led-in-i01">
                <span className={`w-2.5 h-2.5 rounded-full ${plcPower && conveyorRunning ? "bg-emerald-400 shadow-green-400 shadow-sm" : "bg-slate-700"}`} />
                <span className="text-slate-300 font-bold">I:0/1</span>
                <span className="text-slate-400 truncate">(VFD Esteira Start)</span>
              </div>
              <div className="flex items-center gap-1.5" id="led-in-i02">
                <span className={`w-2.5 h-2.5 rounded-full ${plcPower && siloLevelPct <= 10 ? "bg-amber-400" : "bg-slate-700"}`} />
                <span className="text-slate-300 font-bold">I:0/2</span>
                <span className="text-slate-400 truncate">(Silo Level Low)</span>
              </div>
              <div className="flex items-center gap-1.5" id="led-in-i03">
                <span className={`w-2.5 h-2.5 rounded-full ${plcPower && emergencyActive ? "bg-red-500 animate-pulse" : "bg-slate-700"}`} />
                <span className="text-slate-300 font-bold">I:0/3</span>
                <span className="text-slate-400 truncate">(Emerg. NR12)</span>
              </div>
            </div>
          </div>

          {/* Outputs section */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800" id="sub-outputs">
            <span className="text-[9px] font-mono text-slate-400 font-bold block mb-2" id="lbl-sub-outputs">SAÍDAS DE RECURSOS (DO)</span>
            <div className="space-y-1.5 text-[10px] font-mono" id="outputs-leds">
              <div className="flex items-center gap-1.5" id="led-out-o00">
                <span className={`w-2.5 h-2.5 rounded-full ${plcPower && systemOn ? "bg-blue-400 shadow-blue-400 shadow-sm" : "bg-slate-700"}`} />
                <span className="text-slate-300 font-bold">O:0/0</span>
                <span className="text-slate-400 truncate">(Sinalizador ON)</span>
              </div>
              <div className="flex items-center gap-1.5" id="led-out-o01">
                <span className={`w-2.5 h-2.5 rounded-full ${plcPower && conveyorRunning ? "bg-blue-400 shadow-blue-400 shadow-sm" : "bg-slate-700"}`} />
                <span className="text-slate-300 font-bold">O:0/1</span>
                <span className="text-slate-400 truncate">(Contator K1 Habil)</span>
              </div>
              <div className="flex items-center gap-1.5" id="led-out-o02">
                <span className={`w-2.5 h-2.5 rounded-full ${plcPower && emergencyActive ? "bg-red-500 animate-pulse" : "bg-slate-700"}`} />
                <span className="text-slate-300 font-bold">O:0/2</span>
                <span className="text-slate-400 truncate">(Giroflex Alarm)</span>
              </div>
              <button
                id="btn-refill-silo"
                onClick={() => { setSiloLevelPct(100); addLog("Operador solicitou recarga física do Silo.", "success"); }}
                className="w-full mt-1.5 text-[8px] bg-slate-800 hover:bg-slate-700 font-sans border border-slate-700 rounded py-0.5 text-center transition-all cursor-pointer block"
                disabled={!plcPower}
              >
                Refill Silo 
              </button>
            </div>
          </div>
        </div>

        {/* Speed Adjustment Variable Slider */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 my-2" id="panel-sliders">
          <div className="flex items-center justify-between mb-2 text-xs" id="slider-labels">
            <span className="text-slate-400 flex items-center gap-1" id="lbl-slider-vfd">
              <Sliders className="w-3.5 h-3.5 text-brand-orange" />
              Sinal Analógico VFD (Inversor):
            </span>
            <span className="font-mono text-emerald-400 font-bold" id="val-slider-hz">{motorSpeedHz} Hz</span>
          </div>
          <input
            id="slider-hz"
            type="range"
            min={10}
            max={60}
            step={1}
            value={motorSpeedHz}
            onChange={(e) => {
              const hz = Number(e.target.value);
              setMotorSpeedHz(hz);
              if (conveyorRunning && plcPower) {
                addLog(`Mudança VFD Frequência: ${hz}Hz. Nova rampa efetuada.`, "info");
              }
            }}
            className="w-full accent-brand-orange h-1 rounded bg-slate-850 focus:outline-none cursor-pointer"
            disabled={!plcPower}
          />
        </div>

        {/* Operating physical control switches / buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2" id="clp-pushbuttons">
          <button
            id="btn-con-on"
            onClick={handleStartSystem}
            className={`py-2 px-1 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 h-14 border transition-all cursor-pointer ${
              systemOn
                ? "bg-emerald-950 border-emerald-700 text-emerald-400"
                : "bg-slate-800 hover:bg-slate-755 border-slate-700 text-slate-300"
            }`}
            disabled={!plcPower || emergencyActive}
          >
            <Play className="w-4 h-4 shrink-0" />
            Control ON
          </button>

          <button
            id="btn-con-off"
            onClick={handleStopSystem}
            className="bg-slate-800 hover:bg-slate-755 border border-slate-700 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 h-14 text-slate-300 transition-all cursor-pointer"
            disabled={!plcPower}
          >
            <Square className="w-4 h-4 shrink-0" />
            Control OFF
          </button>

          <button
            id="btn-con-start"
            onClick={handleStartConveyor}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 h-14 transition-all cursor-pointer border border-transparent shadow"
            disabled={!plcPower || !systemOn || emergencyActive}
          >
            <Play className="w-4 h-4 text-emerald-100 shrink-0" />
            Esteira Start
          </button>

          <button
            id="btn-con-stop"
            onClick={handleStopConveyor}
            className="bg-red-800 hover:bg-red-900 text-white rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 h-14 transition-all cursor-pointer border border-transparent"
            disabled={!plcPower}
          >
            <Square className="w-4 h-4 text-red-200 shrink-0" />
            Esteira Stop
          </button>
        </div>

        {/* Big Mushroom Emergency Stop button NR12 */}
        <div className="mt-4 border-t border-slate-800 pt-4" id="emergency-section">
          {emergencyActive ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-red-950/80 border border-red-800 p-2.5 rounded-xl text-red-300 text-xs" id="emergency-alert">
              <ShieldAlert className="w-5 h-5 text-red-400 animate-bounce shrink-0" />
              <div className="grow" id="emergency-msg">
                <span className="font-bold block uppercase tracking-wider text-red-400">Circuito NR12 Ativo</span>
                Relé cat. 4 atuado. Para retomar operações seguros, libere o Botão físico de Emergência e clique em Rearmar.
              </div>
              <button
                id="btn-emergency-rearm"
                onClick={handleResetEmergency}
                className="bg-red-800 hover:bg-red-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg border border-red-600 cursor-pointer shadow-md transition-all self-end shrink-0"
              >
                Rearmar Relé
              </button>
            </div>
          ) : (
            <button
              id="btn-emergency-trip"
              onClick={handleEmergencyBtn}
              className="w-full bg-red-600 hover:bg-red-700 shrink-0 select-none text-white py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:animate-pulse transition-all cursor-pointer border-b-4 border-red-850 active:translate-y-0.5 active:border-b-2 shadow-sm text-sm"
              disabled={!plcPower}
            >
              <AlertOctagon className="w-5 h-5" />
              EMERGÊNCIA (STOP NR12)
            </button>
          )}
        </div>
      </div>

      {/* Terminal logs (Col 3) */}
      <div className="xl:col-span-3 flex flex-col justify-between bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-400 shadow-md" id="terminal-clp-logs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 shrink-0" id="terminal-header">
          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5" id="lbl-terminal-title">
            <Terminal className="w-3.5 h-3.5 text-brand-orange" />
            TERMINAL COMPILADOR (CPU)
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" id="dot-compiling" />
        </div>

        {/* Scroll Box */}
        <div
          ref={logScrollRef}
          className="grow overflow-y-auto space-y-2 max-h-[295px] pr-1 scrollbar-thin text-[10px] sm:text-xs leading-relaxed"
          id="terminal-scroller"
        >
          {logs.map((log, index) => (
            <div key={index} className="border-b border-slate-900/40 pb-1.5" id={`log-line-${index}`}>
              <span className="text-slate-600 block sm:inline mr-1">[{log.time}]</span>
              <span className={`font-bold mr-1 ${
                log.type === "success" ? "text-emerald-400" :
                log.type === "warn" ? "text-amber-400" :
                log.type === "error" ? "text-red-400" : "text-brand-blue"
              }`}>
                {log.type.toUpperCase()}:
              </span>
              <span className="text-slate-300">{log.text}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-900 pt-2 text-[9px] text-slate-500 shrink-0 text-center uppercase" id="terminal-footer">
          Siemens STEP 7 Runtime / Lógica ladder compilada
        </div>
      </div>
    </div>
  );
};
