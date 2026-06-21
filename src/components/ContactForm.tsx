import React, { useState } from "react";
import { Send, CheckCircle, Phone, Mail, MapPin, ClipboardList, Clock } from "lucide-react";

export const CoreContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "home_automation",
    priority: "media",
    description: "",
    acceptedTerms: true
  });

  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.description) return;

    // Generate a beautiful mock engineering receipt ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const prefix = formData.category === "electrical" ? "ELT" 
                  : formData.category === "industrial" ? "IND"
                  : formData.category === "engineering" ? "ENG" : "DOM";
    setTicketId(`${prefix}-${randomNum}-2026`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8" id="contact-panel-wrapper">
      
      {/* Contact Info / Technical Support details (Col 4) */}
      <div className="lg:col-span-4 bg-brand-navy text-white rounded-2xl p-6 flex flex-col justify-between" id="contact-info-column">
        <div>
          <span className="text-[10px] uppercase font-bold text-brand-orange tracking-widest font-mono block mb-1">Contato & Suporte</span>
          <h4 className="text-xl font-bold tracking-tight mb-2" id="info-header">Bancada de Projetos</h4>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed" id="info-subtitle">
            Bancada central de engenharia e desenvolvimento de sistemas integrados. Atendemos a todo o território nacional.
          </p>

          <div className="space-y-4" id="address-block">
            <div className="flex items-start gap-3 text-xs" id="row-address">
              <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
              <div>
                <span className="font-semibold block text-slate-300">Setor de Atendimento Central</span>
                <p className="text-slate-400 leading-normal mt-0.5">Av. Paulista, 1100 - Edifício Inovação, Bloco B, 4º Andar - São Paulo, SP</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs" id="row-phone">
              <Phone className="w-5 h-5 text-brand-orange shrink-0" />
              <div>
                <span className="font-semibold block text-slate-300">Quadro de Plantão Técnico / Whatsapp</span>
                <p className="text-slate-400 leading-normal mt-0.5">+55 (48) 99979-3397</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs" id="row-mail">
              <Mail className="w-5 h-5 text-brand-orange shrink-0" />
              <div>
                <span className="font-semibold block text-slate-300">Engenharia e ART Diretrizes</span>
                <p className="text-slate-400 leading-normal mt-0.5">projetos@jbetec.com.br</p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating status banner */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mt-8" id="availability-block">
          <div className="flex items-center gap-2 mb-1.5" id="availability-title-row">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold font-mono text-emerald-400">DISPONIBILIDADE DO DIA</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans" id="availability-desc">
            Engenheiros credenciados prontos para atendimento em regime de conformidade. Tempo de reposta para laudos críticos: 4h.
          </p>
        </div>
      </div>

      {/* Interactive Form or Ticket Confirmation (Col 8) */}
      <div className="lg:col-span-8" id="contact-form-column">
        {ticketId ? (
          /* Confirmation Ticket display */
          <div className="bg-emerald-50/60 border-2 border-emerald-300 p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full animate-fade-in" id="ticket-confirmation-panel">
            <div id="ticket-top">
              <div className="flex items-center gap-3 mb-4" id="ticket-badge-row">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-full" id="ticket-icon">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-950" id="ticket-main-header">Consulta Homologada com Sucesso!</h4>
                  <p className="text-xs text-slate-500 font-mono" id="ticket-id-label">PROTOCOLO DE ATENDIMENTO: <strong>{ticketId}</strong></p>
                </div>
              </div>

              <div className="bg-white border border-emerald-200/80 rounded-xl p-4 sm:p-6 mb-6 space-y-3 shadow-sm text-xs sm:text-sm text-slate-700" id="ticket-details">
                <div className="flex justify-between border-b border-slate-100 pb-2" id="tick-row-name">
                  <span className="text-slate-400">Solicitante:</span>
                  <span className="font-semibold text-brand-navy">{formData.name}</span>
                </div>
                {formData.company && (
                  <div className="flex justify-between border-b border-slate-100 pb-2" id="tick-row-comp">
                    <span className="text-slate-400">Corporativo / Empresa:</span>
                    <span className="font-semibold text-brand-navy">{formData.company}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-slate-100 pb-2" id="tick-row-cat">
                  <span className="text-slate-400">Especialidade Desejada:</span>
                  <span className="font-bold text-brand-orange uppercase">
                    {formData.category === "electrical" && "Projetos Elétricos"}
                    {formData.category === "industrial" && "Automação Industrial"}
                    {formData.category === "engineering" && "Laudos e NR10 / NR12"}
                    {formData.category === "home_automation" && "Automação Residencial"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2" id="tick-row-pri">
                  <span className="text-slate-400">Prioridade de SLA:</span>
                  <span className={`font-semibold uppercase text-xs px-2 py-0.5 rounded ${
                    formData.priority === "alta" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {formData.priority === "alta" ? "Urgência Técnica (4h)" : "Normal (Até 24h)"}
                  </span>
                </div>
                <div className="pt-2" id="tick-row-desc">
                  <span className="text-slate-400 block mb-1">Resumo das Especificações Solicitadas:</span>
                  <p className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs font-mono text-slate-600 italic">"{formData.description}"</p>
                </div>
              </div>
            </div>

            <div className="border-t border-emerald-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" id="ticket-footer">
              <span className="text-slate-500 font-sans" id="ticket-status-label">Acompanhe com o protocolo no fone <strong>+55 (48) 99979-3397</strong></span>
              <button
                id="btn-reopen-form"
                onClick={() => {
                  setTicketId(null);
                  setFormData({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    category: "home_automation",
                    priority: "media",
                    description: "",
                    acceptedTerms: true
                  });
                }}
                className="bg-brand-navy hover:bg-brand-blue text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer shadow transition-colors block shrink-0 text-center"
              >
                Registrar Outro Pedido
              </button>
            </div>
          </div>
        ) : (
          /* Form display */
          <form onSubmit={handleSubmit} className="space-y-4" id="consultation-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-grid-top">
              <div id="form-inp-name">
                <label className="block text-xs font-bold text-slate-700 mb-1" id="lbl-inp-name">Seu Nome Completo *</label>
                <input
                  id="inp-name"
                  type="text"
                  required
                  placeholder="Ex: Geraldo Mendes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-navy rounded-lg p-2.5 text-sm transition-colors focus:ring-1 focus:ring-brand-navy focus:outline-none"
                />
              </div>

              <div id="form-inp-company">
                <label className="block text-xs font-bold text-slate-700 mb-1" id="lbl-inp-company">Empresa / Fabril (Opcional)</label>
                <input
                  id="inp-company"
                  type="text"
                  placeholder="Ex: Alimentos Alfa S/A"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-navy rounded-lg p-2.5 text-sm transition-colors focus:ring-1 focus:ring-brand-navy focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-grid-mid">
              <div id="form-inp-email">
                <label className="block text-xs font-bold text-slate-700 mb-1" id="lbl-inp-email">Email Corporativo ou Residencial *</label>
                <input
                  id="inp-email"
                  type="email"
                  required
                  placeholder="Ex: g.mendes@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-navy rounded-lg p-2.5 text-sm transition-colors focus:ring-1 focus:ring-brand-navy focus:outline-none"
                />
              </div>

              <div id="form-inp-phone">
                <label className="block text-xs font-bold text-slate-700 mb-1" id="lbl-inp-phone">Número de Celular / Whatsapp *</label>
                <input
                  id="inp-phone"
                  type="tel"
                  required
                  placeholder="Ex: (11) 98877-6655"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-navy rounded-lg p-2.5 text-sm transition-colors focus:ring-1 focus:ring-brand-navy focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-grid-selectors">
              <div id="form-inp-cat">
                <label className="block text-xs font-bold text-slate-700 mb-1" id="lbl-inp-cat">Especialidade / Escopo Principal</label>
                <select
                  id="inp-cat"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-navy rounded-lg p-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-brand-navy"
                >
                  <option value="home_automation">Automação de Casas (Domótica)</option>
                  <option value="electrical">Projetos Elétricos (Baixa/Média Tensão)</option>
                  <option value="industrial">Automação Industrial (CLP/SCADA)</option>
                  <option value="engineering">Laudos, Consultoria e ART NR10/NR12</option>
                </select>
              </div>

              <div id="form-inp-priority">
                <label className="block text-xs font-bold text-slate-700 mb-1" id="lbl-inp-priority">Nível de Urgência de Suporte</label>
                <select
                  id="inp-priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-navy rounded-lg p-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-brand-navy"
                >
                  <option value="media">Normal (Orçamento e Planejamento)</option>
                  <option value="alta">Urgente (Parada de planta / Notificação de Concessionária)</option>
                </select>
              </div>
            </div>

            <div id="form-inp-desc">
              <label className="block text-xs font-bold text-slate-700 mb-1" id="lbl-inp-desc">Descrição Detalhada do seu Projeto ou Necessidade *</label>
              <textarea
                id="inp-desc"
                rows={4}
                required
                placeholder="Descreva detalhes como área física, equipamentos existentes, se há laudo exigido ou marcas de preferência..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-navy rounded-lg p-2.5 text-sm transition-colors focus:ring-1 focus:ring-brand-navy focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2" id="form-chk-wrapper">
              <input
                id="chk-terms"
                type="checkbox"
                required
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                className="w-4 h-4 accent-brand-navy font-semibold text-white rounded cursor-pointer"
              />
              <label htmlFor="chk-terms" className="text-xs text-slate-500 cursor-pointer" id="lbl-chk-terms">
                Aceito receber contato técnico via Whatsapp e email para o envio do escopo do projeto.
              </label>
            </div>

            <button
              id="btn-form-submit"
              type="submit"
              className="w-full bg-brand-navy hover:bg-brand-blue text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow"
            >
              <Send className="w-4 h-4 text-brand-orange" />
              Solicitar Homologação de Orçamento Técnico
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
