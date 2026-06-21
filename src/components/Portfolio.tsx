import React, { useState } from "react";
import { CheckSquare, Filter, Building2, Cpu, Zap, Eye, Calendar, Award } from "lucide-react";

interface CaseStudy {
  id: string;
  category: "industrial" | "home" | "electrical" | "utility";
  title: string;
  client: string;
  challenge: string;
  solution: string;
  metric: string;
  year: string;
  norms: string[];
}

const PORTFOLIO_CASES: CaseStudy[] = [
  {
    id: "case-1",
    category: "home",
    title: "Mansão Inteligente com Barramento Integrado KNX",
    client: "Residencial Alphaville",
    challenge: "Integrar mais de 120 circuitos de iluminação dimerizável, 14 cortinas motorizadas, climatização central VRF e sistema de áudio multiroom sem conflito de protocolos ou cabeamento excessivo na estrutura de drywall.",
    solution: "Instalação de rede robusta com protocolo KNX redundante para iluminação e climatização, integrada com atuadores de trilho DIN Shelly Pro. Configuração de tela touchscreen central instalada na sala de estar e assistentes de voz unificados via Home Assistant.",
    metric: "Redução de 35% no cabeamento elétrico convencional interno e 100% de estabilidade offline.",
    year: "2025",
    norms: ["NBR 5410", "IEEE 802.11ax", "NBR IEC 60669"]
  },
  {
    id: "case-2",
    category: "industrial",
    title: "Retrofit Elétrico e Adequação Técnica NR12 de Prensa Hidráulica",
    client: "Indústria Metalúrgica Forjatemp",
    challenge: "Uma prensa mecânica de 150 toneladas operava com painéis de comando em corrente contínua desatualizados, sem cortinas de luz protetoras ou botão de interrupção categorizado, apresentando alto risco operacional de acidentes e multas fiscais.",
    solution: "Substituição completa do quadro de comando antigo por um novo painel IP65 projetado em CAD, CLP Siemens S7-1200 Fail-safe, cortinas ópticas de segurança categoria 4, sensores indutivos redundantes de gaveta de prensa e válvula hidráulica proporcional integrada à rotina lógica.",
    metric: "Conformidade fiscal de 100% comprovada por Laudo de Engenharia com ART e risco operacional nulo.",
    year: "2024",
    norms: ["Portaria MTE NR12", "IEC 61508", "NR10"]
  },
  {
    id: "case-3",
    category: "electrical",
    title: "Subestação Transformadora 13.8kV de 500kVA & Core SPDA",
    client: "Centro Logístico CargoMax",
    challenge: "Instalação de galpão de distribuição que necessitava de conexão dedicada e homologação de subestação simplificada de média tensão permanente junto à concessionária de energia local, além de malha protetiva contra descargas atmosféricas.",
    solution: "Projeto integral de cabine primária sob poste de concreto de 500kVA, dimensionamento de chaves seccionadoras fusíveis, barramento de proteção, disjuntores de vácuo, além de dimensionamento e estratificação de solo por malhas de aterramento com conexões térmicas.",
    metric: "Homologação efetuada em tempo recorde de 24 dias úteis junto à concessionária, sem ressalvas.",
    year: "2025",
    norms: ["NBR 14039", "NBR 5419:2015", "Norma CPFL / Enel"]
  },
  {
    id: "case-4",
    category: "utility",
    title: "Sistema SCADA de Saneamento e Controle de Bombas",
    client: "Estação de Tratamento ETA Norte",
    challenge: "Dificuldade no controle de dosagem química de cloro e monitoramento manual ineficiente de nível em reservatórios de água distantes, gerando risco severo de transbordamento e desabastecimento urbano.",
    solution: "Implantação de rede mesh de rádio industrial Modbus e transdutores piezométricos de nível de precisão de 4-20mA nos reservatórios. Programação de CLP Schneider M221 e interface SCADA Elipse E3 simulada em painel central do operador.",
    metric: "Monitoração instantânea 24/7 com alarmes preventivos via Telegram e economia de 18% em insumos químicos.",
    year: "2024",
    norms: ["ISA-5.1 Instrumentação", "IEC 61131-3", "NR10"]
  }
];

export const TechnicalPortfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filtered = filter === "all" ? PORTFOLIO_CASES : PORTFOLIO_CASES.filter(c => c.category === filter);

  return (
    <div className="w-full" id="portfolio-component-wrapper">
      
      {/* Filters bar */}
      <div className="flex flex-wrap gap-2 justify-center mb-8" id="portfolio-filter-bar">
        <button
          id="btn-port-all"
          onClick={() => setFilter("all")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
            filter === "all"
              ? "bg-brand-orange text-white shadow"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          Todos Projetos
        </button>
        <button
          id="btn-port-home"
          onClick={() => setFilter("home")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
            filter === "home"
              ? "bg-brand-orange text-white shadow"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          Automação Residencial
        </button>
        <button
          id="btn-port-industrial"
          onClick={() => setFilter("industrial")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
            filter === "industrial"
              ? "bg-brand-orange text-white shadow"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          Industrial (CLP/SCADA)
        </button>
        <button
          id="btn-port-electrical"
          onClick={() => setFilter("electrical")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
            filter === "electrical"
              ? "bg-brand-orange text-white shadow"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Elétricos & Subestações
        </button>
      </div>

      {/* Grid of cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="portfolio-cases-grid">
        {filtered.map((item) => (
          <div
            key={item.id}
            id={`portfolio-case-${item.id}`}
            className="bg-white border border-slate-200 hover:border-slate-350 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div id={`port-case-body-${item.id}`}>
              {/* Category tags */}
              <div className="flex items-center justify-between mb-4" id={`port-case-badge-row-${item.id}`}>
                <span className="text-[10px] uppercase font-bold text-brand-orange tracking-widest font-mono" id={`port-case-cat-${item.id}`}>
                  {item.category === "home" && "RESIDENCIAL / CONECTADO"}
                  {item.category === "industrial" && "AUTOMAÇÃO DE MÁQUINAS / NR12"}
                  {item.category === "electrical" && "POTÊNCIA / MÉDIA TENSÃO"}
                  {item.category === "utility" && "SANEAMENTO / TELEMETRIA"}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono" id={`port-case-year-${item.id}`}>
                  <Calendar className="w-3.5 h-3.5" />
                  {item.year}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-orange transition-colors" id={`port-case-title-${item.id}`}>
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-mono" id={`port-case-client-${item.id}`}>Cliente: {item.client}</p>

              {/* Detail list items */}
              <div className="my-4 space-y-3 pt-3 border-t border-slate-100" id={`port-case-text-${item.id}`}>
                <div id={`item-challenge-${item.id}`}>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">O Desafio Técnico:</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">{item.challenge}</p>
                </div>

                <div id={`item-solution-${item.id}`}>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Nossa Solução de Engenharia:</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{item.solution}</p>
                </div>
              </div>
            </div>

            {/* Metric highlight box */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3" id={`port-case-results-${item.id}`}>
              <div className="bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-lg text-emerald-800 flex items-center gap-2" id={`metric-box-${item.id}`}>
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold leading-none">{item.metric}</span>
              </div>

              <button
                id={`btn-open-case-${item.id}`}
                onClick={() => setSelectedCase(item)}
                className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center justify-center gap-1 transition-colors cursor-pointer self-end"
              >
                <Eye className="w-3.5 h-3.5" />
                Dossiê Completo
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal Alert detail details */}
      {selectedCase && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 pointer-events-auto" id="portfolio-modal">
          <div className="bg-white border-2 border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in relative" id="modal-container">
            {/* Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-100 pb-4 mb-6" id="modal-header-row">
              <div>
                <span className="text-[10px] font-bold text-brand-orange tracking-widest font-mono uppercase">DOSSIÊ TÉCNICO DE ENGENHARIA</span>
                <h3 className="text-xl md:text-2xl font-bold text-brand-navy tracking-tight mt-1">{selectedCase.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Garantido por Engenheiro Responsável (CREA / ART)</p>
              </div>
              <button
                id="btn-close-modal"
                onClick={() => setSelectedCase(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold font-sans transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Contents */}
            <div className="space-y-5 text-sm" id="modal-contents">
              <div id="modal-m-client">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Empresa / Parceiro:</span>
                <p className="font-semibold text-brand-navy text-base mt-0.5">{selectedCase.client} (Ciclo operacional {selectedCase.year})</p>
              </div>

              <div id="modal-m-challenge" className="bg-slate-50 p-4 rounded-xl border border-slate-250">
                <span className="text-[10px] uppercase font-bold text-red-500 block tracking-wider font-mono">Problema Operacional Identificado:</span>
                <p className="text-slate-700 leading-relaxed mt-1 text-xs md:text-sm font-sans">{selectedCase.challenge}</p>
              </div>

              <div id="modal-m-solution" className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider font-mono">Proposta de Arquitetura Executada:</span>
                <p className="text-slate-800 leading-relaxed mt-1 text-xs md:text-sm font-sans">{selectedCase.solution}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" id="modal-specs-grid">
                <div id="modal-specs-norms">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono mb-2">Conformidade Normativa Legal:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.norms.map((n, idx) => (
                      <span key={idx} className="bg-brand-navy text-white text-[10px] font-mono font-bold py-1 px-2.5 rounded-md" id={`modal-norm-${idx}`}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div id="modal-specs-ratio" className="flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono mb-1">Métrica de Sucesso Homologada:</span>
                  <div className="bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 py-2 px-3 rounded-lg text-center text-xs" id="modal-success-ratio">
                    {selectedCase.metric}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="border-t border-slate-100 pt-6 mt-6 flex justify-end" id="modal-footer">
              <a
                href="#contact"
                onClick={() => setSelectedCase(null)}
                className="bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                id="modal-cta-btn"
              >
                Inicie um estudo de viabilidade para minha empresa
                <CheckSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
