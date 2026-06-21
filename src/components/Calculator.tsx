import React, { useState, useMemo } from "react";
import { Zap, Plus, Trash2, ShieldCheck, Activity, HelpCircle, RefreshCw } from "lucide-react";
import { LoadCalculatorItem } from "../types";

const INITIAL_LOAD_ITEMS: LoadCalculatorItem[] = [
  { id: "1", name: "Motores Trifásicos de Indução (Ex: Chapa de fábrica)", powerW: 3750, qty: 1, factor: 0.8 },
  { id: "2", name: "Sistemas de Condicionamento de Ar (Geral)", powerW: 2400, qty: 2, factor: 0.9 },
  { id: "3", name: "Iluminação LED de Alta Eficiência", powerW: 450, qty: 1, factor: 1.0 },
  { id: "4", name: "Tomadas Gerais de Uso Comum (TUGs)", powerW: 1200, qty: 1, factor: 0.5 }
];

// Simplified Lookup for Copper Conductors (PVC insulation, embedded in conduits/wall - NBR 5410 Metodo B1)
// Amperage-to-bitola mapping
const CABLE_SIZES_COPPER = [
  { sizeMm2: 1.5, maxAmps: 15.5 },
  { sizeMm2: 2.5, maxAmps: 21 },
  { sizeMm2: 4.0, maxAmps: 28 },
  { sizeMm2: 6.0, maxAmps: 36 },
  { sizeMm2: 10.0, maxAmps: 50 },
  { sizeMm2: 16.0, maxAmps: 68 },
  { sizeMm2: 25.0, maxAmps: 89 },
  { sizeMm2: 35.0, maxAmps: 110 }
];

// standard circuit breaker sizes
const CIRCUIT_BREAKER_RATINGS = [10, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100, 125];

export const TechnicalCalculator: React.FC = () => {
  const [items, setItems] = useState<LoadCalculatorItem[]>(INITIAL_LOAD_ITEMS);
  const [voltage, setVoltage] = useState<number>(220);
  const [phases, setPhases] = useState<1 | 2 | 3>(3);
  const [powerFactor, setPowerFactor] = useState<number>(0.85); // Standard power factor

  // Form states for adding items
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemPower, setNewItemPower] = useState<number>(1000);
  const [newItemQty, setNewItemQty] = useState<number>(1);
  const [newItemFactor, setNewItemFactor] = useState<number>(0.8);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemPower <= 0 || newItemQty <= 0) return;

    const newItem: LoadCalculatorItem = {
      id: Date.now().toString(),
      name: newItemName,
      powerW: newItemPower,
      qty: newItemQty,
      factor: newItemFactor
    };

    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemPower(1000);
    setNewItemQty(1);
    setNewItemFactor(0.8);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const resetCalculator = () => {
    setItems([]);
  };

  // Calculations
  const calculationsResult = useMemo(() => {
    let totalInstalledW = 0;
    let totalDemandW = 0;

    items.forEach(item => {
      const installed = item.powerW * item.qty;
      totalInstalledW += installed;
      totalDemandW += installed * item.factor;
    });

    const totalApparentPowerVA = totalDemandW / powerFactor;

    // Current (A) calculation based on phases
    // Monofásico / Bifásico (Neutro e Fase ou duas Fases sem raiz de 3)
    // Trifásico: I = P / (V * FP * sqrt(3))
    let projectCurrentAmps = 0;
    if (phases === 3) {
      projectCurrentAmps = totalDemandW / (voltage * powerFactor * Math.sqrt(3));
    } else {
      projectCurrentAmps = totalDemandW / (voltage * powerFactor);
    }

    if (isNaN(projectCurrentAmps) || !isFinite(projectCurrentAmps)) {
      projectCurrentAmps = 0;
    }

    // Recommended breaker (must be > projectCurrent, ideally closest higher standard value)
    const recommendedBreaker = CIRCUIT_BREAKER_RATINGS.find(rating => rating >= projectCurrentAmps * 1.25) || 125;

    // Recommended conductor size (base on breaker capacity or current * safety margin)
    // Conductor capacity must be > breaker capacity according to coordination rules (I_project <= I_breaker <= I_cable)
    const designCurrentThreshold = Math.max(projectCurrentAmps, recommendedBreaker);
    const recommendedCable = CABLE_SIZES_COPPER.find(c => c.maxAmps >= designCurrentThreshold) || { sizeMm2: 50, maxAmps: 150 };

    return {
      totalInstalledKW: totalInstalledW / 1000,
      totalDemandKW: totalDemandW / 1000,
      totalApparentPowerKVA: totalApparentPowerVA / 1000,
      currentAmps: projectCurrentAmps,
      breakerAmps: recommendedBreaker,
      cableMm2: recommendedCable.sizeMm2,
      cableMaxAmps: recommendedCable.maxAmps
    };
  }, [items, voltage, phases, powerFactor]);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8" id="technical-calculator-panel">
      
      {/* Configuration & Item input (Left/Main section) */}
      <div className="lg:col-span-7" id="calc-inputs-column">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6" id="calc-title-row">
          <div className="flex items-center gap-3" id="calc-title-left">
            <div className="p-2.5 bg-brand-light text-brand-orange rounded-xl border border-slate-100" id="calc-header-icon">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-brand-navy" id="calc-main-header">Dimensionamento de Carga Elétrica</h4>
              <p className="text-xs text-slate-500 font-mono" id="calc-standard-indicator">CONFORME ABNT NBR 5410:2004</p>
            </div>
          </div>
          <button
            id="btn-reset-calc"
            onClick={resetCalculator}
            className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-red-500 font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Resetar Tudo
          </button>
        </div>

        {/* Global technical variables */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/60" id="calc-globals">
          <div id="wrapper-voltage">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5" id="label-voltage">Tensão de Alimentação</label>
            <select
              id="select-voltage"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-brand-navy font-medium focus:ring-1 focus:ring-brand-navy focus:outline-none"
            >
              <option value={127}>127 V</option>
              <option value={220}>220 V</option>
              <option value={380}>380 V</option>
              <option value={440}>440 V</option>
            </select>
          </div>

          <div id="wrapper-phases">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5" id="label-phases">Tipo de Sistema</label>
            <select
              id="select-phases"
              value={phases}
              onChange={(e) => setPhases(Number(e.target.value) as 1 | 2 | 3)}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-brand-navy font-medium focus:ring-1 focus:ring-brand-navy focus:outline-none"
            >
              <option value={1}>Monofásico (F + N)</option>
              <option value={2}>Bifásico (F + F)</option>
              <option value={3}>Trifásico (3F + N)</option>
            </select>
          </div>

          <div id="wrapper-fp">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1" id="label-fp">
              Fator de Potência (cos φ)
              <span className="group relative cursor-help text-slate-400">
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded leading-normal shadow-lg z-20 font-sans">
                  Eficiência ativa do sistema. Geralmente 0.8 a 0.95. Motores indutivos puxam o fator para baixo.
                </span>
              </span>
            </label>
            <input
              id="input-fp"
              type="number"
              min={0.5}
              max={1}
              step={0.01}
              value={powerFactor}
              onChange={(e) => setPowerFactor(Math.min(1, Math.max(0.1, Number(e.target.value))))}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-brand-navy font-mono focus:ring-1 focus:ring-brand-navy focus:outline-none"
            />
          </div>
        </div>

        {/* Load Equipment List */}
        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-3" id="calc-equipment-list-header">Lista de Cargas / Equipamentos</h5>
        <div className="space-y-2 max-h-56 overflow-y-auto mb-6 pr-1" id="calc-equipment-scroll">
          {items.length === 0 ? (
            <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs" id="calc-empty-indicator">
              Nenhuma carga adicionada. Utilize o formulário abaixo para simular equipamentos.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                id={`calc-item-row-${item.id}`}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-150 transition-colors"
              >
                <div id={`calc-item-left-${item.id}`}>
                  <p className="text-sm font-semibold text-brand-navy" id={`item-name-${item.id}`}>{item.name}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5" id={`item-sub-${item.id}`}>
                    {item.qty}x de {item.powerW}W | Fator Demanda: {Math.round(item.factor * 100)}%
                  </p>
                </div>
                <div className="flex items-center gap-4" id={`calc-item-right-${item.id}`}>
                  <span className="text-sm font-mono font-bold text-brand-navy" id={`item-total-${item.id}`}>
                    {Math.round(item.powerW * item.qty * item.factor)} W (Dem.)
                  </span>
                  <button
                    id={`btn-remove-item-${item.id}`}
                    onClick={() => removeItem(item.id)}
                    className="p-1 px-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Remover equipamento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Equipment Form */}
        <form onSubmit={addItem} className="p-4 bg-brand-light border border-slate-200 rounded-2xl" id="calc-add-form">
          <h6 className="text-xs font-bold text-brand-navy mb-3" id="add-form-title">Adicionar Nova Carga Elétrica</h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3" id="add-form-grids">
            <div id="form-item-name">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1" id="label-add-name">Nome da Carga ou Setor</label>
              <input
                id="input-add-name"
                type="text"
                placeholder="Ex: Refeitório Cozinha, Painel de Torno"
                required
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-navy"
              />
            </div>

            <div className="grid grid-cols-3 gap-2" id="form-numbers">
              <div id="form-item-power">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1" id="label-add-power">Potência (W)</label>
                <input
                  id="input-add-power"
                  type="number"
                  min={1}
                  required
                  value={newItemPower}
                  onChange={(e) => setNewItemPower(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
              </div>
              <div id="form-item-qty">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1" id="label-add-qty">Qtd</label>
                <input
                  id="input-add-qty"
                  type="number"
                  min={1}
                  required
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
              </div>
              <div id="form-item-factor">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1" id="label-add-factor">Fat. Dem.</label>
                <input
                  id="input-add-factor"
                  type="number"
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  required
                  value={newItemFactor}
                  onChange={(e) => setNewItemFactor(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
              </div>
            </div>
          </div>
          <button
            id="btn-add-submit"
            type="submit"
            className="w-full bg-brand-navy hover:bg-brand-blue text-white text-xs font-semibold p-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar à Tabela de Cálculo
          </button>
        </form>
      </div>

      {/* Calculations Outputs Results (Right column / Dashboard style) */}
      <div className="lg:col-span-5 bg-brand-navy text-white rounded-2xl p-6 flex flex-col justify-between shadow-inner" id="calc-results-column">
        <div id="results-top">
          <div className="flex items-center gap-2 mb-6" id="results-badge-row">
            <span className="bg-brand-orange text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded" id="badge-tech">Laudo de Engenharia</span>
            <span className="text-xs text-slate-300 font-mono" id="label-results-title">DIAGNÓSTICO TÉCNICO</span>
          </div>

          {/* Sizing dashboards */}
          <div className="space-y-4" id="results-parameters">
            <div id="res-installed">
              <span className="text-slate-400 text-xs block" id="label-res-installed">Potência Ativa Instalada</span>
              <span className="text-2xl font-bold font-mono text-brand-light" id="val-res-installed">
                {calculationsResult.totalInstalledKW.toFixed(2)} <span className="text-sm font-sans font-medium text-slate-400">kW</span>
              </span>
            </div>

            <div id="res-demand">
              <span className="text-slate-400 text-xs block" id="label-res-demand">Demanda Ativa Máxima Simulada (kW)</span>
              <span className="text-xl font-bold font-mono text-white" id="val-res-demand">
                {calculationsResult.totalDemandKW.toFixed(2)} kW
              </span>
            </div>

            <div id="res-current" className="border-t border-slate-700/60 pt-4">
              <span className="text-slate-400 text-xs block" id="label-res-current">Corrente de Trabalho Estimada (Ip)</span>
              <div className="flex items-baseline gap-2" id="wrapper-res-current">
                <span className="text-3xl font-extrabold font-mono text-brand-orange" id="val-res-current">
                  {calculationsResult.currentAmps.toFixed(1)} <span className="text-lg font-sans font-medium">A</span>
                </span>
                <span className="text-xs text-slate-400 font-mono" id="volt-amps-calc">
                  ({calculationsResult.totalApparentPowerKVA.toFixed(2)} kVA aparente)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cable & Protections coordination outputs */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 mt-6 space-y-3" id="safety-parameters">
          <div className="flex items-center justify-between" id="row-breaker">
            <span className="text-xs text-slate-300 flex items-center gap-1.5" id="label-breaker">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              Disjuntor Termomagnético (In):
            </span>
            <span className="font-mono text-sm font-bold bg-slate-800 text-brand-light px-2.5 py-1 rounded border border-slate-700" id="val-breaker">
              {calculationsResult.breakerAmps} A (Tipo C)
            </span>
          </div>

          <div className="flex items-center justify-between" id="row-cable">
            <span className="text-xs text-slate-300 flex items-center gap-1.5" id="label-cable">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse-subtle" />
              Bitola do Cabo de Cobre:
            </span>
            <span className="font-mono text-sm font-bold bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded border border-emerald-800" id="val-cable">
              {calculationsResult.cableMm2.toFixed(1)} mm²
            </span>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800 pt-2" id="disclaimer-text">
            *Condições: Método B1 (cabo multipolar em eletroduto embutido). Fator de agrupamento = 1. Para projetos definitivos com perdas por harmônicos, queda de tensão por distância e outras instalações, consulte nossa engenharia certificada.
          </p>

          <a
            href="#contact"
            className="block text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-xs py-2 px-4 rounded-lg transition-all mt-2 cursor-pointer shadow"
            id="btn-calculator-quote-link"
          >
            Validar meu Cálculo com Engenheiro
          </a>
        </div>
      </div>
    </div>
  );
};
