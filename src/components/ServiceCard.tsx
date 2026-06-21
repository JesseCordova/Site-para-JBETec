import React, { useState } from "react";
import { Zap, Home, ShieldAlert, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ServiceItem } from "../types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "electrical",
    title: "Projetos Elétricos",
    category: "electrical",
    icon: "zap",
    description: "Projetos robustos de baixa e média tensão que focam em segurança, eficiência e otimização de infraestrutura.",
    longDescription: "Planejamento, dimensionamento e diagramação completa de redes elétricas para instalações comerciais, residenciais e industriais. Garantimos que sua infraestrutura tenha a potência correta de alimentação com custos otimizados de cabeamento e equipamentos de proteção de ponta.",
    bulletPoints: [
      "Diagramas unifilares e trifilares detalhados",
      "Quadros de Distribuição e Painéis de Força (QGDT)",
      "Projetos de SPDA (Para-raios) e Malhas de Aterramento",
      "Cálculo de queda de tensão e balanceamento de fases",
      "Infraestrutura de caminhos de cabos e eletrocalhas"
    ],
    keyStandards: ["ABNT NBR 5410 (Baixa Tensão)", "ABNT NBR 14039 (Média Tensão)", "ABNT NBR 5419 (SPDA)"],
    technologies: ["AutoCAD Electrical", "QIBuilder", "Dialux EVO (Luminotécnico)", "EPLAN"]
  },
  {
    id: "home_automation",
    title: "Automação de Casas (Domótica)",
    category: "home_automation",
    icon: "home",
    description: "Conectividade, conveniência e sofisticação. Sistemas integrados de iluminação, clima, segurança e áudio.",
    longDescription: "Transformamos propriedades residenciais em ecossistemas de alta conectividade. Criamos soluções sob medida para controle de cenários de iluminação inteligente, climatização programável, sistemas de som multiroom e segurança perimetral acessível por voz ou dispositivos móveis.",
    bulletPoints: [
      "Integração centralizada de iluminação e dimmers",
      "Automação de ar-condicionado, persianas e portões",
      "Sistemas de Áudio & Vídeo High-End (Home Theater e Multi-room)",
      "Câmeras Inteligentes, biometria e controle de acessos",
      "Controle unificado por comando de voz (Alexa, Google Assistant)"
    ],
    keyStandards: ["Protocolo KNX (Padrão Global)", "Certificação IEEE 802.11 / Zigbee / Z-Wave", "NBR IEC 60669"],
    technologies: ["Home Assistant", "Lutron", "KNX", "Control4", "Zigbee", "Sonoff / Tuya / Shellys"]
  },
  {
    id: "engineering",
    title: "Engenharia & Laudos Técnicos",
    category: "engineering",
    icon: "shield",
    description: "Laudos, consultoria técnica, conformidade de normas regulamentadoras e gestão de eficiência energética.",
    longDescription: "Assinatura técnica, emissão de ART, perícias e auditorias para garantir conformidade legal com os órgãos fiscalizadores e concessionárias de energia. Oferecemos segurança jurídica e operacional para seu negócio.",
    bulletPoints: [
      "Laudos técnicos de instalações elétricas (LIER)",
      "Prontuário de Instalações Elétricas (Conformidade com NR10)",
      "Consultoria de eficiência energética e correção de fator de potência",
      "Laudos de aterramento e estratificação de solo",
      "Análise de harmônicas e oscilações de energia"
    ],
    keyStandards: ["Norma Regulamentadora MTE NR10", "Norma de Segurança NR12", "Procedimentos de Distribuição ANEEL (PRODIST)"],
    technologies: ["Analisadores de Energia Fluke", "Terrômetros de Alta Frequência", "Softwares de Simulação Térmica", "Emissão de ART/CREA"]
  },
  {
    id: "industrial",
    title: "Automação Industrial",
    category: "industrial",
    icon: "cpu",
    description: "Programação de CLPs, sistemas de supervisão (SCADA), instrumentação fina e adequação completa NR12.",
    longDescription: "Modernização e controle de processos de manufatura ou utilidades. Projetamos lógicas robustas de controle, integramos inversores, servo-motores, sensores analógicos e construímos telas intuitivas para monitoramento e controle total do chão de fábrica.",
    bulletPoints: [
      "Programação Avançada de CLP (Siemens, Rockwell, Schneider, Delta)",
      "Desenvolvimento de Interfaces Web IHM e Sistemas Supervisórios SCADA",
      "Adequação de segurança de máquinas e painéis (NR12)",
      "Redes Industriais de alto desempenho (Profinet, EtherNet/IP, Modbus)",
      "Controle de motores de precisão e inversores de frequência sincronizados"
    ],
    keyStandards: ["Norma Regulamentadora MTE NR12", "IEC 61131-3 (Linguagens CLP)", "ISA-5.1 (Simbologia de Instrumentação)"],
    technologies: ["TIA Portal (Siemens)", "Studio 5000 (Rockwell)", "Node-RED", "Elipse E3 / Indusoft", "CODESYS"]
  }
];

export const ServiceCardList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "zap":
        return <Zap className="w-6 h-6 text-brand-orange" id="icon-zap" />;
      case "home":
        return <Home className="w-6 h-6 text-brand-orange" id="icon-home" />;
      case "shield":
        return <ShieldAlert className="w-6 h-6 text-brand-orange" id="icon-shield" />;
      case "cpu":
        return <Cpu className="w-6 h-6 text-brand-orange" id="icon-cpu" />;
      default:
        return <Zap className="w-6 h-6 text-brand-orange" id="icon-default" />;
    }
  };

  const filteredServices = selectedCategory === "all"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full" id="services-showcase-container">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8" id="category-filter-bar">
        <button
          id="btn-filter-all"
          onClick={() => { setSelectedCategory("all"); setExpandedId(null); }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === "all"
              ? "bg-brand-navy text-white shadow-md border-b-2 border-brand-orange"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Todos os Serviços
        </button>
        <button
          id="btn-filter-electrical"
          onClick={() => { setSelectedCategory("electrical"); setExpandedId(null); }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === "electrical"
              ? "bg-brand-navy text-white shadow-md border-b-2 border-brand-orange"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Projetos Elétricos
        </button>
        <button
          id="btn-filter-home"
          onClick={() => { setSelectedCategory("home_automation"); setExpandedId(null); }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === "home_automation"
              ? "bg-brand-navy text-white shadow-md border-b-2 border-brand-orange"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Automação de Casas
        </button>
        <button
          id="btn-filter-engineering"
          onClick={() => { setSelectedCategory("engineering"); setExpandedId(null); }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === "engineering"
              ? "bg-brand-navy text-white shadow-md border-b-2 border-brand-orange"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Engenharia e Laudos
        </button>
        <button
          id="btn-filter-industrial"
          onClick={() => { setSelectedCategory("industrial"); setExpandedId(null); }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === "industrial"
              ? "bg-brand-navy text-white shadow-md border-b-2 border-brand-orange"
              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Automação Industrial
        </button>
      </div>

      {/* Grid of service cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="services-grid">
        {filteredServices.map((service) => {
          const isExpanded = expandedId === service.id;
          return (
            <motion.div
              layout
              key={service.id}
              id={`service-card-${service.id}`}
              className={`bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 ${
                isExpanded ? "ring-2 ring-brand-navy/10 shadow-xl col-span-1 md:col-span-2" : "hover:shadow-lg shadow-sm"
              }`}
            >
              {/* Card Header & Brief Summary */}
              <div className="p-6 md:p-8" id={`card-header-container-${service.id}`}>
                <div className="flex items-start md:items-center justify-between gap-4" id={`card-top-row-${service.id}`}>
                  <div className="flex items-center gap-4" id={`title-row-${service.id}`}>
                    <div className="p-3 bg-brand-light rounded-xl border border-slate-100" id={`icon-wrapper-${service.id}`}>
                      {getIcon(service.icon)}
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-brand-orange tracking-wider" id={`category-tag-${service.id}`}>
                        {service.category === "electrical" && "Potência & Distribuição"}
                        {service.category === "home_automation" && "Sistemas Conectados"}
                        {service.category === "engineering" && "Auditoria & Qualidade"}
                        {service.category === "industrial" && "Controle & Fábricas"}
                      </span>
                      <h4 className="text-xl md:text-2xl font-bold text-brand-navy mt-0.5" id={`title-${service.id}`}>
                        {service.title}
                      </h4>
                    </div>
                  </div>
                  
                  <button
                    id={`toggle-details-btn-${service.id}`}
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    className="group bg-brand-light hover:bg-brand-navy hover:text-white text-brand-navy w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer"
                    aria-label={isExpanded ? "Fechar detalhes" : "Ver mais detalhes"}
                  >
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-90 text-white" : "group-hover:translate-x-1"}`} />
                  </button>
                </div>

                <p className="text-slate-600 mt-4 leading-relaxed" id={`desc-${service.id}`}>
                  {service.description}
                </p>

                {/* Compact tags preview */}
                <div className="flex flex-wrap gap-1.5 mt-4" id={`tags-preview-${service.id}`}>
                  {service.keyStandards.slice(0, 2).map((std, idx) => (
                    <span key={idx} className="bg-slate-50 border border-slate-150 text-[10px] md:text-xs font-mono px-2.5 py-1 text-slate-500 rounded" id={`std-tag-${service.id}-${idx}`}>
                      {std.split(" ")[0]} {std.split(" ")[1]}
                    </span>
                  ))}
                  {service.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="bg-brand-light text-brand-blue text-[10px] md:text-xs font-medium px-2.5 py-1 rounded" id={`tech-tag-${service.id}-${idx}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Collapsible Details Panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-slate-100 bg-slate-50 overflow-hidden"
                    id={`collapsible-panel-${service.id}`}
                  >
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8" id={`details-content-${service.id}`}>
                      {/* Detailed Bulletpoints */}
                      <div id={`bullets-section-${service.id}`}>
                        <h5 className="font-semibold text-brand-navy mb-4 flex items-center gap-2" id={`bullets-header-${service.id}`}>
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          Escopo de Entrega Detalhado
                        </h5>
                        <ul className="space-y-3" id={`bullets-list-${service.id}`}>
                          {service.bulletPoints.map((bp, index) => (
                            <li key={index} className="text-sm text-slate-600 flex items-start gap-2.5" id={`bp-item-${service.id}-${index}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Norms & Technologies */}
                      <div className="flex flex-col gap-6" id={`specs-section-${service.id}`}>
                        {/* Normative Compliance */}
                        <div id={`norms-sub-${service.id}`}>
                          <h6 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2.5" id={`norms-header-${service.id}`}>
                            Conformidade Regulamentar (Normas Técnicas)
                          </h6>
                          <div className="flex flex-col gap-1.5" id={`norms-list-${service.id}`}>
                            {service.keyStandards.map((std, index) => (
                              <div key={index} className="bg-white border border-slate-200 p-2 rounded text-xs font-mono text-slate-700 flex items-center justify-between" id={`std-detail-${service.id}-${index}`}>
                                <span className="font-semibold text-brand-orange">{std.split(" ")[0]} {std.split(" ")[1]}</span>
                                <span className="text-slate-500 text-[11px] truncate ml-2">{std.substring(std.indexOf("("))}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technology Stack */}
                        <div id={`tech-sub-${service.id}`}>
                          <h6 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2" id={`tech-header-${service.id}`}>
                            Tecnologias & Ferramentas Utilizadas
                          </h6>
                          <div className="flex flex-wrap gap-2" id={`tech-list-${service.id}`}>
                            {service.technologies.map((tech, index) => (
                              <span key={index} className="bg-brand-navy text-white text-xs font-medium px-3 py-1 rounded-md" id={`tech-badge-${service.id}-${index}`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Call to action inside details */}
                        <div className="mt-2 pt-4 border-t border-slate-200/60" id={`cta-block-${service.id}`}>
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors cursor-pointer"
                            id={`cta-link-${service.id}`}
                          >
                            Solicitar orçamento técnico para esta categoria
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
