import Link from "next/link";
import {
  Archive,
  ChevronRight,
  AlertTriangle,
  Eye,
  Network,
  Clock,
  Shield,
  FileText,
  Users,
  Search,
  Lock,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";

const problemCards = [
  {
    icon: AlertTriangle,
    title: "Fragmentación",
    desc: "La evidencia está dispersa en decenas de fuentes desconectadas: organizaciones, archivos personales, redes sociales, medios. No existe un hilo conductor.",
  },
  {
    icon: Clock,
    title: "Volatilidad",
    desc: "Testimonios y documentos desaparecen. Cuentas eliminadas, sitios caídos, archivos destruidos. La represión no solo ocurre: también borra su rastro.",
  },
  {
    icon: Eye,
    title: "Inaccesibilidad",
    desc: "La información técnica y legal es inaccesible para víctimas y familiares. La complejidad del sistema favorece al perpetrador.",
  },
  {
    icon: Users,
    title: "Monopolio del relato",
    desc: "Sin infraestructura ciudadana, el relato del pasado queda en manos del poder. La memoria oficial sustituye a la memoria real.",
  },
];

const solutionCards = [
  {
    icon: Archive,
    title: "Archivo Digital Unificado",
    desc: "Centralización de testimonios, documentos, registros audiovisuales y archivos judiciales en un único repositorio seguro y trazable.",
  },
  {
    icon: Shield,
    title: "Trazabilidad y Verificación",
    desc: "Cada caso documenta quién revisó, cuándo y con qué fuentes. El proceso de verificación es auditable y transparente.",
  },
  {
    icon: Search,
    title: "IA Contextual",
    desc: "Análisis asistido que identifica patrones, actores, territorios y conexiones entre casos. La IA asiste; los humanos verifican.",
  },
  {
    icon: Network,
    title: "Red de Vínculos",
    desc: "Visualización de relaciones entre actores, instituciones, hechos y territorios. La estructura del patrón hecha visible.",
  },
  {
    icon: Clock,
    title: "Línea de Tiempo",
    desc: "Cronología visual e interactiva de eventos documentados desde 2014 hasta hoy. El pasado como contexto del presente.",
  },
  {
    icon: Lock,
    title: "Privacidad Adaptativa",
    desc: "Control total sobre la visibilidad del testimonio: público, privado o anonimizado. Protección del testigo sin sacrificar la memoria.",
  },
];

const profiles = [
  { icon: "👤", label: "Víctimas",        desc: "Que necesitan que su historia no se pierda"  },
  { icon: "👨‍👩‍👧", label: "Familiares",      desc: "Que buscan justicia y reconocimiento"       },
  { icon: "⚖️", label: "Defensores DDHH", desc: "Que documentan y litigan casos"               },
  { icon: "🔬", label: "Investigadores",  desc: "Que analizan patrones y estructuras"          },
  { icon: "📰", label: "Periodistas",     desc: "Que relatan la historia con evidencia"        },
  { icon: "🌎", label: "Sociedad civil",  desc: "Que exige verdad, justicia y reparación"      },
];

const heroStats = [
  { value: "4,847",    label: "Testimonios registrados" },
  { value: "23,412",   label: "Documentos integrados"   },
  { value: "892",      label: "Casos verificados"       },
  { value: "2014–2024",label: "Período documentado"     },
];

export default function LandingPage() {
  return (
    <div className="bg-archive text-gray-800">

      {/* ── Hero animado ─────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-doc-gray">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-doc-gray">
          {heroStats.map((s) => (
            <div key={s.label} className="px-8 py-6">
              <div className="text-2xl sm:text-3xl font-bold text-inst-blue font-mono mb-1">
                {s.value}
              </div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── El problema ──────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-gold border-b border-gold pb-0.5 mb-5">
              El problema
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-inst-blue tracking-tight mb-5 leading-tight">
              La evidencia está<br />fragmentada.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              Venezuela tiene una de las crisis de derechos humanos más documentadas de América
              Latina — y aun así, esa documentación está dispersa, en riesgo e inaccesible para
              quienes más la necesitan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemCards.map((card) => (
              <div key={card.title} className="inst-card card-gold-accent p-7 rounded-sm">
                <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                  <card.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-semibold text-inst-blue text-base mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-rule max-w-7xl mx-auto" />

      {/* ── La solución ──────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-archive paper-texture">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-inst-blue/60 border-b border-inst-blue/20 pb-0.5 mb-5">
              La solución
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-inst-blue tracking-tight mb-5 leading-tight">
              Un archivo democrático<br />para el pueblo venezolano.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              El Sistema Nacional de Memoria Democrática integra testimonios, documentos,
              registros audiovisuales y archivos judiciales en una plataforma trazable,
              verificable y consultable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionCards.map((card) => (
              <div key={card.title} className="inst-card card-gold-accent p-7 rounded-sm bg-white">
                <div className="w-10 h-10 rounded-sm bg-inst-blue/5 border border-inst-blue/15 flex items-center justify-center mb-5">
                  <card.icon className="w-5 h-5 text-inst-blue" />
                </div>
                <h3 className="font-semibold text-inst-blue text-base mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────────────────── */}
      <section className="bg-inst-blue py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { value: "4,847",  label: "Testimonios", sub: "registrados en el sistema"  },
              { value: "23,412", label: "Documentos",  sub: "integrados y clasificados"  },
              { value: "892",    label: "Casos",       sub: "verificados y publicados"   },
              { value: "156",    label: "Patrones",    sub: "detectados por IA"          },
            ].map((s) => (
              <div key={s.label} className="bg-inst-blue px-8 py-8 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white font-mono mb-1">{s.value}</div>
                <div className="text-gold font-semibold text-sm mb-0.5">{s.label}</div>
                <div className="text-white/40 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Para quién ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-gold border-b border-gold pb-0.5 mb-5">
              Para quién
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-inst-blue tracking-tight">
              Una plataforma para todos los actores<br className="hidden sm:block" /> de la memoria.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {profiles.map((p) => (
              <div key={p.label} className="inst-card p-6 text-center rounded-sm">
                <div className="text-2xl mb-3">{p.icon}</div>
                <div className="text-sm font-semibold text-inst-blue mb-1">{p.label}</div>
                <div className="text-xs text-gray-500 leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cita institucional ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-archive paper-texture">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gold-rule-short mx-auto mb-10" />
          <blockquote>
            <p className="text-2xl sm:text-3xl font-light text-inst-blue leading-snug mb-8 italic">
              &ldquo;La memoria no es un acto del pasado.<br />Es un acto político del presente.&rdquo;
            </p>
            <footer className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">
              — Principio fundacional · Sistema Nacional de Memoria Democrática
            </footer>
          </blockquote>
          <div className="gold-rule-short mx-auto mt-10" />
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="bg-inst-blue py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-gold mx-auto mb-10" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            Explora la demo.
          </h2>
          <p className="text-lg text-white/60 mb-12 leading-relaxed">
            Navega el dashboard analítico, la cronología visual y la red de vínculos.
            Conoce la plataforma que preservará la memoria democrática venezolana.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gold hover:bg-gold-light text-inst-blue font-bold text-sm tracking-wide rounded-sm shadow-lg shadow-black/20 transition-all"
            >
              Explorar el sistema
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/testimonio"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/30 hover:border-white/60 text-white font-semibold text-sm tracking-wide rounded-sm transition-all hover:bg-white/5"
            >
              <FileText className="w-4 h-4" />
              Registrar un testimonio
            </Link>
          </div>
          <p className="text-[10px] font-mono tracking-widest text-white/25 mt-10 uppercase">
            Demo visual · Sin backend real · Datos ficticios
          </p>
        </div>
      </section>
    </div>
  );
}
