import React, { useState, useMemo } from "react";
import { FileText, Cpu, ChevronRight, ChevronLeft, Sparkles, CheckCircle, Package, ArrowRight, ShieldCheck, Mail } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  category: "industrial" | "home" | "electrical";
  costFactor: number;
}

export const ProjectPlanner: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<"industrial" | "home" | "electrical">("home");
  const [areaSqm, setAreaSqm] = useState<number>(120);
  const [automationLevel, setAutomationLevel] = useState<"basic" | "intermediate" | "advanced">("intermediate");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Form info for requested receipt
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Available addon options based on choices
  const serviceOptions: ServiceOption[] = [
    { id: "spda", name: "Laudo & Projeto SPDA (Para-Raios)", category: "electrical", costFactor: 1500 },
    { id: "pot", name: "Projeto de Subestação e Trafo", category: "electrical", costFactor: 5000 },
    { id: "quadro", name: "Dimensionamento de Painel de Força e Distribuição (QG)", category: "electrical", costFactor: 800 },
    
    { id: "scada", name: "Desenvolvimento de Telas Supervisório SCADA", category: "industrial", costFactor: 4500 },
    { id: "nr12", name: "Laudo de Análise de Risco NR12 Integrado", category: "industrial", costFactor: 2800 },
    { id: "vfd", name: "Integração Avançada de Inversores e Servos", category: "industrial", costFactor: 2200 },
    
    { id: "audio", name: "Climatização & Áudio Multiroom", category: "home", costFactor: 3200 },
    { id: "acesso", name: "Controle de Acesso Biométrico Inteligente", category: "home", costFactor: 1600 },
    { id: "network", name: "Rede estruturada Wi-Fi 6 de alta performance", category: "home", costFactor: 1200 }
  ];

  const filteredOptions = useMemo(() => {
    return serviceOptions.filter(o => o.category === category);
  }, [category]);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Generate recommendation report details
  const generatedProposal = useMemo(() => {
    // Estimations algorithms
    const baseRate = category === "industrial" ? 45 : category === "electrical" ? 25 : 30; // R$ por m2
    const levelMultiplier = automationLevel === "basic" ? 1 : automationLevel === "intermediate" ? 1.6 : 2.4;
    
    let servicesCost = 0;
    selectedServices.forEach(srvId => {
      const option = serviceOptions.find(o => o.id === srvId);
      if (option) servicesCost += option.costFactor;
    });

    const laborCostEstimate = (areaSqm * baseRate * levelMultiplier) + (servicesCost * 0.4);
    const hardwareEstimate = (areaSqm * baseRate * levelMultiplier * 1.5) + (servicesCost * 0.8);
    const totalEstimate = laborCostEstimate + hardwareEstimate;

    // Timeline estimate
    const weeksEstimate = Math.ceil((areaSqm / 50) * levelMultiplier + (selectedServices.length * 0.8));

    // Hardware bill recommendations based on sector
    let recommendedHardwareList: string[] = [];
    let technicalSpecs: string[] = [];
    let associatedNorms: string[] = [];

    if (category === "industrial") {
      recommendedHardwareList = [
        "Unidade de Processamento Central Siemens SIMATIC S7-1200 (CPU 1214C DC/DC/DC)",
        "Módulos de Expansão de I/O Analógico SM 1231",
        "Cartão de Segurança Fail-Safe Siemens F-DI/F-DQ (Adequação NR12)",
        "Inversor de Frequência Vetorial Siemens SINAMICS G120",
        "Painel IHM Touchscreen Siemens Comfort Panel 7\""
      ];
      technicalSpecs = [
        "Rede de comunicação de campo integrada Profinet / Modbus TCP",
        "Segurança de máquina projetada conforme Categoria 4 / Performance Level d (PLd)",
        "Controles digitais lógicos programados sob padrão IEC 61131-3"
      ];
      associatedNorms = ["NR12 (Segurança de Máquinas)", "NR10 (Segurança em Eletricidade)", "IEC 61508 / ISO 13849"];
    } else if (category === "home") {
      recommendedHardwareList = [
        "Controlador Central Inteligente Multi-protocolo (Zigbee 3.0, Z-Wave, KNX)",
        "Módulos Atuadores de Trilho DIN Shelly Pro 4PM para iluminação",
        "Sensores de Movimento / Presença de Alta Resolução",
        "Interfaces de Parede Inteligentes e Termostatos Conectados",
        "Roteadores Mesh Wi-Fi 6 de Baixa Latência Gigabit"
      ];
      technicalSpecs = [
        "Lógica local redundante para funcionamento ininterrupto offline",
        "Criptografia ponta-a-ponta TLS para controle interno e remoto de acessos",
        "Integração nativa sem cabos físicos em barramento duplo inteligente"
      ];
      associatedNorms = ["NBR 5410 (Instalações em Baixa Tensão)", "Norma Eletromagnética CISPR 15 / FCC", "Protocolos de segurança Zigbee Alliance"];
    } else {
      recommendedHardwareList = [
        "Dispositivos de Proteção contra Surtos (DPS Classe II, Imax 45kA)",
        "Quadro de Distribuição em Termoplástico Autoextinguível IP65",
        "Barramento Flutuante Isolado Tipo Pente (Cobre Eletrolítico)",
        "Disjuntores Termomagnéticos Curva C (DIN residenciais e comerciais)",
        "Condutores Flexíveis de Cobre livres de Halogênio (HEPR 90°C)"
      ];
      technicalSpecs = [
        "Dimensionamento de queda de tensão em regime permanente inferior a 4%",
        "Coerência total e seletividade nas correntes de curto-circuito",
        "Malha de terra dimensionada para resistividade elétrica do solo local"
      ];
      associatedNorms = ["ABNT NBR 5410 (Baixa Tensão)", "ABNT NBR 5419:2015 (Prevenção SPDA)", "Norma das Concessionárias de Energia Locais (Ex: Enel, CPFL, Cemig)"];
    }

    return {
      laborCost: laborCostEstimate,
      hardwareCost: hardwareEstimate,
      totalCost: totalEstimate,
      weeks: weeksEstimate,
      hardware: recommendedHardwareList,
      specs: technicalSpecs,
      norms: associatedNorms
    };
  }, [category, areaSqm, automationLevel, selectedServices]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8" id="project-planner-root">
      
      {/* Progress & Setup side controls (Col 1-5) */}
      <div className="lg:col-span-5 flex flex-col justify-between" id="planner-setup-column">
        <div id="setup-header">
          <div className="flex items-center gap-2 mb-4" id="planner-badge-row">
            <span className="p-1.5 bg-brand-navy text-brand-orange rounded-lg" id="planner-mini-icon">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-extrabold text-brand-navy tracking-widest font-mono" id="planner-sub">Escopo Inteligente</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-brand-navy" id="planner-main-heading">Crie sua Proposta Técnica</h4>
          <p className="text-sm text-slate-500 mt-2" id="planner-desc">
            Selecione as dimensões da sua infraestrutura e necessidades tecnológicas para estruturar o memorial descritivo inicial.
          </p>

          {/* Stepper progress indicator */}
          <div className="flex items-center gap-1.5 mt-6 mb-8" id="stepper-dots">
            {[1, 2, 3, 4].map(sNum => (
              <div key={sNum} className="flex items-center" id={`step-indicator-${sNum}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                    step >= sNum
                      ? "bg-brand-navy text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {sNum}
                </div>
                {sNum < 4 && <div className={`w-8 h-0.5 ${step > sNum ? "bg-brand-navy" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step interactive inputs */}
        <div className="grow min-h-[220px]" id="step-forms-container">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in" id="step1-content">
              <label className="block text-sm font-bold text-slate-700" id="label-step1">Passo 1: Qual o escopo do seu projeto?</label>
              <div className="grid grid-cols-1 gap-3" id="category-selector-planner">
                <button
                  id="choice-cat-home"
                  onClick={() => { setCategory("home"); setSelectedServices([]); }}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    category === "home"
                      ? "border-brand-orange bg-white shadow-md ring-1 ring-brand-orange/20"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="font-bold text-brand-navy block text-sm">Residencial inteligente (Smart Home)</span>
                  <span className="text-xs text-slate-500 block mt-1">Luzes, climatização, áudio perimetral e biometrias integradas.</span>
                </button>

                <button
                  id="choice-cat-industrial"
                  onClick={() => { setCategory("industrial"); setSelectedServices([]); }}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    category === "industrial"
                      ? "border-brand-orange bg-white shadow-md ring-1 ring-brand-orange/20"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="font-bold text-brand-navy block text-sm">Industrial / Manufatura</span>
                  <span className="text-xs text-slate-500 block mt-1">CLPs, IHM supervisório, painel de comando de motores e adequações NR12.</span>
                </button>

                <button
                  id="choice-cat-electrical"
                  onClick={() => { setCategory("electrical"); setSelectedServices([]); }}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    category === "electrical"
                      ? "border-brand-orange bg-white shadow-md ring-1 ring-brand-orange/20"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="font-bold text-brand-navy block text-sm">Projetos Elétricos de Potência</span>
                  <span className="text-xs text-slate-500 block mt-1">Diagramas NBR 5410, quadros, SPDA aterramento e balanceamento de fase.</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in" id="step2-content">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2" id="label-area">Passo 2: Qual a Área Física / Escopo em m²?</label>
                <div className="flex items-center gap-4" id="row-range">
                  <input
                    id="slider-area"
                    type="range"
                    min={20}
                    max={1200}
                    step={10}
                    value={areaSqm}
                    onChange={(e) => setAreaSqm(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <span className="font-mono font-bold bg-white text-brand-navy border border-slate-200 px-3 py-1.5 rounded-lg text-sm shrink-0" id="val-area">
                    {areaSqm} m²
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3" id="label-integration">Nível de Integração Tecnológica</label>
                <div className="grid grid-cols-3 gap-2" id="grid-integration-pills">
                  {["basic", "intermediate", "advanced"].map((lvl) => (
                    <button
                      key={lvl}
                      id={`btn-lvl-${lvl}`}
                      onClick={() => setAutomationLevel(lvl as "basic" | "intermediate" | "advanced")}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border uppercase tracking-wider transition-all cursor-pointer ${
                        automationLevel === lvl
                          ? "bg-brand-navy text-white border-brand-navy shadow-sm"
                          : "bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {lvl === "basic" && "Básico"}
                      {lvl === "intermediate" && "Médio"}
                      {lvl === "advanced" && "Avançado"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2" id="integration-desc">
                  {automationLevel === "basic" && "Ideal para pequenas quadros ou automações básicas com excelente custo-benefício."}
                  {automationLevel === "intermediate" && "Melhor equilíbrio. Sensores estratégicos, CLP modular ou automações integradas completas."}
                  {automationLevel === "advanced" && "Redundâncias elétricas completas, relés cat 4, controle completo perimetral de alta gama."}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in" id="step3-content">
              <label className="block text-sm font-bold text-slate-700 mb-1" id="label-addons">Passo 3: Módulos Técnicos Opcionais (Add-ons)</label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1" id="addons-scroller">
                {filteredOptions.length === 0 ? (
                  <p className="text-xs text-slate-400" id="no-addons-msg">Nenhum opcional de engenharia disponível para esta categoria.</p>
                ) : (
                  filteredOptions.map((opt) => {
                    const isSelected = selectedServices.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        id={`addon-btn-${opt.id}`}
                        onClick={() => toggleService(opt.id)}
                        className={`w-full p-3.5 text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-50 text-slate-900 border-emerald-500 shadow-sm"
                            : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        <span className="text-xs font-semibold block" id={`addon-name-${opt.id}`}>{opt.name}</span>
                        <div className="flex items-center gap-2" id={`addon-meta-${opt.id}`}>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-mono ${isSelected ? "bg-emerald-200 text-emerald-800" : "bg-slate-100 text-slate-500"}`} id={`addon-badge-${opt.id}`}>
                            {isSelected ? "Selecionado" : "Opcional"}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in" id="step4-content">
              <label className="block text-sm font-bold text-slate-700 mb-1" id="label-contact">Passo 4: Informe seus contatos para envio</label>
              
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-800 text-xs flex flex-col gap-2" id="planner-email-submitted">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle className="w-4 h-4" />
                    Pedido de Contato Protocolado!
                  </span>
                  Enviamos o rascunho de engenharia completo e os códigos de hardware para o seu email: <strong>{clientEmail}</strong>. Nossa equipe entrará em contato em menos de 24h.
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3" id="planner-email-form">
                  <div id="wrapper-form-name">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1" id="lbl-form-name">Nome do Solicitante</label>
                    <input
                      id="input-form-name"
                      type="text"
                      placeholder="Ex: Roberto Silva (Instalações Volt)"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-brand-navy focus:outline-none"
                    />
                  </div>
                  <div id="wrapper-form-email">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1" id="lbl-form-email">Email Corporativo ou Pessoal</label>
                    <input
                      id="input-form-email"
                      type="email"
                      placeholder="Ex: roberto@empresa.com.br"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-brand-navy focus:outline-none"
                    />
                  </div>
                  <button
                    id="btn-planner-mail-submit"
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs p-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Protocolar e Receber Projeto no Email
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Navigation bottom line */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6 shrink-0" id="planner-nav-row">
          <button
            id="btn-nav-prev"
            onClick={handlePrevStep}
            disabled={step === 1}
            className={`flex items-center gap-1 text-xs font-bold font-mono border border-slate-200 bg-white px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              step === 1 ? "opacity-35 cursor-not-allowed" : "hover:bg-slate-50"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>

          {step < 4 ? (
            <button
              id="btn-nav-next"
              onClick={handleNextStep}
              className="flex items-center gap-1 text-xs font-bold font-mono bg-brand-navy hover:bg-brand-blue text-white px-4 py-2 rounded-lg transition-all cursor-pointer shadow"
            >
              Avançar
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-semibold font-mono text-slate-400 uppercase" id="lbl-step-done">Memorial Pronto</span>
          )}
        </div>
      </div>

      {/* Dynamic Report Document (Col 6-12) */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-md flex flex-col justify-between" id="planner-report-column">
        {/* Document Header block */}
        <div id="report-top-flow">
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3" id="report-doc-title">
            <div id="doc-title-left">
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider font-mono uppercase" id="lbl-report-title">MEMORIAL DESCRITIVO PRELIMINAR</span>
              <h5 className="font-bold text-sm text-brand-navy leading-tight mt-0.5" id="val-report-title">
                {category === "industrial" && "AUTOMAÇÃO DE PROCESSO / MAQUINA"}
                {category === "home" && "BANCADA E LINHA DE DOMÓTICA INTERATIVA"}
                {category === "electrical" && "DISTRIBUIÇÃO ELÉTRICA COMBINADA"}
              </h5>
            </div>
            <FileText className="w-6 h-6 text-brand-orange shrink-0" />
          </div>

          {/* Sizing indicators metadata pills */}
          <div className="flex flex-wrap gap-2 py-3 border-b border-slate-100 text-[11px] font-mono text-slate-500" id="report-doc-meta">
            <span id="meta-area">Dimensionamento: <strong>{areaSqm}m²</strong></span>
            <span id="meta-divider-1">|</span>
            <span id="meta-lvl">Tecnologia: <strong className="uppercase">{automationLevel}</strong></span>
            <span id="meta-divider-2">|</span>
            <span id="meta-date">Geração: <strong>13 Jun 2026</strong></span>
          </div>

          <div className="space-y-4 py-4" id="report-doc-body">
            {/* 1. Technical specification details */}
            <div id="spec-technical">
              <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase mb-1.5" id="lbl-spec-tech">1. Diretrizes de Engenharia Aplicadas</span>
              <ul className="space-y-1.5" id="list-spec-tech">
                {generatedProposal.specs.map((sp, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5" id={`spec-tech-item-${idx}`}>
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange mt-0.5 shrink-0" />
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. BOM: Bill of Materials */}
            <div id="spec-bom">
              <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase mb-1.5" id="lbl-spec-bom">2. Código de Dispositivos Recomendados (BOM)</span>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-600 space-y-1 max-h-36 overflow-y-auto" id="list-spec-bom">
                {generatedProposal.hardware.map((hw, idx) => (
                  <div key={idx} className="flex items-start gap-1 pb-1 border-b border-slate-200/50 last:border-0" id={`spec-bom-item-${idx}`}>
                    <span className="text-brand-orange mr-1">•</span>
                    <span>{hw}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Normative checks */}
            <div id="spec-norms">
              <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase mb-1.5" id="lbl-spec-norms">3. Normas Técnicas Vinculadas</span>
              <div className="flex flex-wrap gap-1.5" id="pills-spec-norms">
                {generatedProposal.norms.map((n, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono font-bold py-1 px-2.5 rounded flex items-center gap-1" id={`norm-pill-${idx}`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cost estimations summary at the bottom */}
        <div className="border-t-2 border-slate-100 pt-4 mt-4 bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-2xl" id="report-footer">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" id="report-footer-cols">
            <div id="col-cost">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block" id="lbl-footer-cost">Valor Preliminar Homologado</span>
              <span className="text-xl font-extrabold text-brand-navy font-mono flex items-baseline gap-1" id="val-footer-cost">
                R$ {Math.round(generatedProposal.totalCost).toLocaleString("pt-BR")}
                <span className="text-[10.5px] font-sans font-normal text-slate-500 text-left"> (Infraestrutura + Ativos + Mão-de-Obra ART)</span>
              </span>
            </div>
            
            <div className="bg-brand-navy text-white py-2 px-4 rounded-xl text-center self-stretch sm:self-auto flex flex-col justify-center" id="col-milestones">
              <span className="text-[9px] font-bold text-slate-400 block uppercase" id="lbl-footer-milestones">Prazo de Entrega Estimado</span>
              <span className="text-base font-extrabold font-mono text-brand-orange" id="val-footer-milestones">
                {generatedProposal.weeks} Semanas
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
