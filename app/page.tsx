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
  Globe,
} from "lucide-react";

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
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "Archivo Digital Unificado",
    desc: "Centralización de testimonios, documentos, registros audiovisuales y archivos judiciales en un único repositorio seguro y trazable.",
  },
  {
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Trazabilidad y Verificación",
    desc: "Cada caso documenta quién revisó, cuándo y con qué fuentes. El proceso de verificación es auditable y transparente.",
  },
  {
    icon: Search,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    title: "IA Contextual",
    desc: "Análisis asistido que identifica patrones, actores, territorios y conexiones entre casos. La IA asiste; los humanos verifican.",
  },
  {
    icon: Network,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "Red de Vínculos",
    desc: "Visualización de relaciones entre actores, instituciones, hechos y territorios. La estructura del patrón hecha visible.",
  },
  {
    icon: Clock,
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
    title: "Línea de Tiempo",
    desc: "Cronología visual e interactiva de eventos documentados desde 2014 hasta hoy. El pasado como contexto del presente.",
  },
  {
    icon: Lock,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    title: "Privacidad Adaptativa",
    desc: "Control total sobre la visibilidad del testimonio: público, privado o anonimizado. Protección del testigo sin sacrificar la memoria.",
  },
];

const profiles = [
  { icon: "👤", label: "Víctimas", desc: "Que necesitan que su historia no se pierda" },
  { icon: "👨‍👩‍👧", label: "Familiares", desc: "Que buscan justicia y reconocimiento" },
  { icon: "⚖️", label: "Defensores DDHH", desc: "Que documentan y litigan casos" },
  { icon: "🔬", label: "Investigadores", desc: "Que analizan patrones y estructuras" },
  { icon: "📰", label: "Periodistas", desc: "Que relatan la historia con evidencia" },
  { icon: "🌎", label: "Sociedad civil", desc: "Que exige verdad, justicia y reparación" },
];

const stats = [
  { value: "4,847", label: "Testimonios registrados" },
  { value: "23,412", label: "Documentos integrados" },
  { value: "892", label: "Casos verificados" },
  { value: "2014–2024", label: "Período documentado" },
];

export default function LandingPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 border border-slate-700/60 bg-slate-900/60 px-4 py-1.5 rounded-full text-xs text-slate-400 font-mono mb-10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
            Sistema Nacional de Memoria Democrática · Venezuela
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-slate-50 mb-6 leading-[0.95]">
            La memoria
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-slate-300">
              está viva.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-12">
            Una infraestructura digital para preservar, documentar y hacer
            trazable la memoria histórica de Venezuela — para que el relato del
            pasado no sea monopolizado por el poder.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-base transition-all shadow-lg shadow-blue-900/30"
            >
              Explorar demo
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/testimonio"
              className="flex items-center gap-2 px-7 py-3.5 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 rounded-lg font-semibold text-base transition-all"
            >
              <FileText className="w-4 h-4" />
              Enviar testimonio
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px border border-slate-800/60 rounded-xl overflow-hidden bg-slate-800/30">
            {stats.map((s) => (
              <div key={s.label} className="bg-slate-900/60 px-5 py-5 text-center backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-slate-100 font-mono mb-1">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600">
          <div className="text-[10px] uppercase tracking-widest font-mono">Explorar</div>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </section>

      {/* ── El problema ───────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="text-xs font-mono text-amber-400/80 uppercase tracking-widest mb-3">El problema</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
            La evidencia está<br />
            <span className="text-slate-400">fragmentada.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Venezuela tiene una de las crisis de derechos humanos más documentadas de América Latina — y aun así, esa documentación está dispersa, en riesgo y es inaccesible para quienes más la necesitan.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problemCards.map((card) => (
            <div key={card.title} className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <card.icon className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-semibold text-slate-200 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-800/60" />
      </div>

      {/* ── La solución ───────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="text-xs font-mono text-blue-400/80 uppercase tracking-widest mb-3">La solución</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
            Un archivo democrático<br />
            <span className="text-slate-400">para el pueblo venezolano.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            El Sistema Nacional de Memoria Democrática integra testimonios, documentos, registros audiovisuales y archivos judiciales en una plataforma trazable, verificable y consultable.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutionCards.map((card) => (
            <div key={card.title} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 hover:bg-slate-900/80 transition-all">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-4 ${card.bg}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <h3 className="font-semibold text-slate-200 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Para quién ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Para quién</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              Una plataforma para todos los actores<br />de la memoria.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {profiles.map((p) => (
              <div key={p.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center hover:border-slate-700 transition-colors">
                <div className="text-2xl mb-3">{p.icon}</div>
                <div className="text-sm font-semibold text-slate-200 mb-1">{p.label}</div>
                <div className="text-xs text-slate-500 leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cita ──────────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <blockquote>
          <p className="text-2xl sm:text-3xl font-semibold text-slate-200 leading-snug mb-6">
            &ldquo;La memoria no es un acto del pasado.<br />Es un acto político del presente.&rdquo;
          </p>
          <footer className="text-sm text-slate-500 font-mono">
            — Principio fundacional del Sistema Nacional de Memoria Democrática
          </footer>
        </blockquote>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-glow-bottom" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">Explora la demo.</h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            Navega el dashboard analítico, la cronología visual y la red de vínculos. Conoce la plataforma que preservará la memoria democrática venezolana.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-base transition-all shadow-lg shadow-blue-900/40">
              <Globe className="w-4 h-4" />
              Explorar el sistema
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/testimonio" className="flex items-center gap-2 px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-slate-100 rounded-lg font-semibold text-base transition-all hover:bg-slate-800/50">
              <FileText className="w-4 h-4" />
              Registrar un testimonio
            </Link>
          </div>
          <p className="text-xs text-slate-600 font-mono mt-8">Demo visual · Sin backend real · Datos ficticios</p>
        </div>
      </section>
    </div>
  );
}
