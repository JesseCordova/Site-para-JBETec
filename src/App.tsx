import React from "react";
import { Zap, ShieldCheck, Mail, Phone, ExternalLink, ArrowRight, Award, MessageSquare } from "lucide-react";
import { ServiceCardList } from "./components/ServiceCard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col" id="main-app">
      
      {/* Premium Minimal Navigation Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-100 z-40 transition-all shadow-sm" id="nav-header">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between" id="nav-container">
          
          {/* Logo & Brand ID */}
          <div className="flex items-center gap-2.5" id="brand-logo-link">
            <div className="p-2 bg-brand-navy rounded-xl text-brand-orange shrink-0" id="brand-logo-icon">
              <Zap className="w-5 h-5" id="brand-zap" />
            </div>
            <div>
              <span className="text-sm font-black text-brand-navy tracking-tight font-mono block uppercase">JBETec</span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest font-sans mt-0.5">Engenharia & Automação</span>
            </div>
          </div>

          {/* Quick Contact Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono font-bold" id="header-contact-block">
            <a href="mailto:projetos@jbetec.com.br" className="hidden md:flex items-center gap-1.5 text-slate-600 hover:text-brand-orange transition-colors">
              <Mail className="w-3.5 h-3.5" />
              projetos@jbetec.com.br
            </a>
            <a href="tel:+5548999793397" className="flex items-center gap-1.5 text-brand-navy hover:text-brand-orange transition-colors">
              <Phone className="w-3.5 h-3.5" />
              (48) 99979-3397
            </a>
          </div>

        </div>
      </header>

      {/* Hero Welcome Intro & Heading */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" id="main-content">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16" id="services-header-box">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-full mb-4" id="intro-badge-row">
            <span className="bg-brand-orange w-2 h-2 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider font-mono">Engenharia de Alta Performance</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight" id="hero-main-title">
            Serviços Especializados <br className="hidden sm:inline" />
            de <span className="text-brand-orange">Engenharia Elétrica</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed" id="services-sub">
            Projetos planejados sob rígido padrão de excelência: limpos, redundantes, altamente funcionais e documentados em conformidade com as normas NBR 5410, NR10 e NR12.
          </p>
        </div>

        {/* Specialized Services Interactive Showcase */}
        <section className="mb-16" id="services">
          <ServiceCardList />
        </section>

        {/* Brand Authority Certifications Badge Row */}
        <section className="border-t border-slate-200/60 pt-10 pb-4" id="authority-section">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center" id="authority-grid">
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1" id="auth-crea">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-brand-navy font-mono">CREA-SC</span>
              <span className="text-[10px] text-slate-400">Pessoa Jurídica Homologada</span>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1" id="auth-nr10">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-brand-navy font-mono">NBR 5410</span>
              <span className="text-[10px] text-slate-400">Instalações em Baixa Tensão</span>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1" id="auth-nr12">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-brand-navy font-mono">NR12 CAT 4</span>
              <span className="text-[10px] text-slate-400">Laudos e Parada Segura</span>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1" id="auth-art">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-brand-navy font-mono">CREA / ART</span>
              <span className="text-[10px] text-slate-400">Atestado de Responsabilidade</span>
            </div>
          </div>
        </section>

        {/* Quick Compact Contact Section */}
        <section className="mt-8 bg-brand-navy text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-md" id="contact">
          <div className="absolute inset-0 bg-[radial-gradient(var(--color-brand-blue)_1px,transparent_0)] opacity-15" style={{ backgroundSize: "20px 20px" }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8" id="quick-contact-content">
            <div className="space-y-3 text-center md:text-left" id="contact-text">
              <span className="text-xs font-bold font-mono text-brand-orange uppercase tracking-wider block">Inicie seu Estudo de Viabilidade</span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Precisa de um orçamento técnico ou laudo homologonado?</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Entre em contato com nossa bancada de engenharia para agendar vistorias in-loco ou solicitar estudos preliminares com conformidade legal garantida.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 font-mono text-xs font-bold" id="contact-buttons-wrapper">
              <a
                href="mailto:projetos@jbetec.com.br"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white py-3.5 px-6 rounded-2xl shadow text-center transition-all flex items-center justify-center gap-2"
                id="contact-email-btn"
              >
                <Mail className="w-4 h-4" />
                projetos@jbetec.com.br
              </a>
              <a
                href="tel:+5548999793397"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-6 rounded-2xl text-center transition-all flex items-center justify-center gap-2"
                id="contact-phone-btn"
              >
                <Phone className="w-4 h-4" />
                (48) 99979-3397
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Credentials */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900 mt-auto" id="main-footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6" id="footer-container">
          <div className="flex items-center gap-2" id="footer-logo">
            <span className="p-1.5 bg-brand-navy text-brand-orange rounded" id="footer-mini-logo">
              <Zap className="w-4 h-4" />
            </span>
            <span className="text-sm font-black text-white tracking-widest font-mono">JBETec</span>
            <span className="text-xs text-slate-500 font-sans border-l border-slate-800 pl-2 ml-1">Engenharia Elétrica & Automação</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500 space-y-1" id="footer-copy">
            <p>JBETec Soluções em Engenharia Elétrica Ltda. | Registro de Pessoa Jurídica CREA-SC nº 2088451</p>
            <p className="pt-1 text-[10px] text-slate-600">© 2026 JBETec. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
