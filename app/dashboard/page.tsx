"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, Filter, FileText, CheckCircle, AlertCircle, Clock,
  Eye, EyeOff, Shield, ChevronRight, TrendingUp, BarChart3,
  MapPin, Brain, X,
} from "lucide-react";
import {
  mockCases, dashboardStats, violationLabels, type ViolationType,
  type VerificationStatus, type PrivacyLevel,
} from "@/lib/mock-data";

const violationTypes: { value: ViolationType | ""; label: string }[] = [
  { value: "", label: "Todos los tipos" },
  { value: "detencion_arbitraria", label: "Detención arbitraria" },
  { value: "tortura", label: "Tortura" },
  { value: "desaparicion_forzada", label: "Desaparición forzada" },
  { value: "ejecucion_extrajudicial", label: "Ejecución extrajudicial" },
  { value: "persecucion_politica", label: "Persecución política" },
  { value: "exilio", label: "Exilio forzado" },
  { value: "censura", label: "Censura" },
];

const statusOptions: { value: VerificationStatus | ""; label: string }[] = [
  { value: "", label: "Todos los estados" },
  { value: "verified", label: "Verificado" },
  { value: "pending", label: "En revisión" },
  { value: "unverified", label: "Sin verificar" },
];

const privacyOptions: { value: PrivacyLevel | ""; label: string }[] = [
  { value: "", label: "Toda la privacidad" },
  { value: "public", label: "Público" },
  { value: "anonymized", label: "Anonimizado" },
  { value: "private", label: "Privado" },
];

const years = ["", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"];

function VerificationBadge({ status }: { status: VerificationStatus }) {
  if (status === "verified")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle className="w-3 h-3" /> Verificado
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3 h-3" /> En revisión
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
      <AlertCircle className="w-3 h-3" /> Sin verificar
    </span>
  );
}

function PrivacyBadge({ level }: { level: PrivacyLevel }) {
  const map = {
    public: { icon: Eye, cls: "bg-blue-50 text-blue-700 border-blue-200", label: "Público" },
    anonymized: { icon: Shield, cls: "bg-inst-blue/5 text-inst-blue border-inst-blue/20", label: "Anonimizado" },
    private: { icon: EyeOff, cls: "bg-gray-100 text-gray-500 border-gray-200", label: "Privado" },
  };
  const { icon: Icon, cls, label } = map[level];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-medium border ${cls}`}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

const violationColors: Record<ViolationType, string> = {
  detencion_arbitraria: "text-amber-700",
  tortura: "text-rep-red",
  desaparicion_forzada: "text-rose-700",
  ejecucion_extrajudicial: "text-red-700",
  persecucion_politica: "text-orange-700",
  exilio: "text-gray-600",
  censura: "text-purple-700",
  otro: "text-gray-500",
};

const aiPatterns = [
  { label: "Patrón: SEBIN + aislamiento > 30 días", count: 23, trend: "+4 este mes" },
  { label: "Patrón: FAES + escena manipulada", count: 18, trend: "+2 este mes" },
  { label: "Co-ocurrencia: Táchira + GNB + protestas", count: 31, trend: "Estable" },
  { label: "Patrón: detención sin orden + Caracas", count: 67, trend: "+12 este mes" },
  { label: "Clúster temporal: Jul 2024 +280%", count: 112, trend: "Alerta nueva" },
];

const selectCls = "bg-white border border-doc-gray rounded-sm px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-inst-blue/50 cursor-pointer";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<ViolationType | "">("");
  const [filterStatus, setFilterStatus] = useState<VerificationStatus | "">("");
  const [filterPrivacy, setFilterPrivacy] = useState<PrivacyLevel | "">("");
  const [filterYear, setFilterYear] = useState("");

  const filteredCases = useMemo(() => {
    return mockCases.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        violationLabels[c.type].toLowerCase().includes(q);
      return (
        matchSearch &&
        (!filterType || c.type === filterType) &&
        (!filterStatus || c.verificationStatus === filterStatus) &&
        (!filterPrivacy || c.privacyLevel === filterPrivacy) &&
        (!filterYear || String(c.year) === filterYear)
      );
    });
  }, [search, filterType, filterStatus, filterPrivacy, filterYear]);

  const hasFilters = search || filterType || filterStatus || filterPrivacy || filterYear;
  const clearFilters = () => { setSearch(""); setFilterType(""); setFilterStatus(""); setFilterPrivacy(""); setFilterYear(""); };

  return (
    <div className="min-h-screen bg-archive">
      {/* Page header */}
      <div className="bg-inst-blue border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/70 mb-1">
                Sistema Nacional · Panel de control
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Casos documentados
              </h1>
              <p className="text-sm text-white/50 mt-0.5">
                {dashboardStats.testimonios.toLocaleString()} testimonios · {dashboardStats.casosVerificados} verificados
              </p>
            </div>
            <Link
              href="/testimonio"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-inst-blue rounded-sm text-sm font-semibold transition-colors shrink-0"
            >
              <FileText className="w-4 h-4" />
              Nuevo testimonio
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Testimonios", value: dashboardStats.testimonios.toLocaleString(), icon: FileText, sub: "+127 este mes", accent: "border-t-2 border-t-inst-blue" },
            { label: "Documentos", value: dashboardStats.documentos.toLocaleString(), icon: BarChart3, sub: "+2,340 este mes", accent: "border-t-2 border-t-rep-blue" },
            { label: "Casos verificados", value: dashboardStats.casosVerificados.toLocaleString(), icon: CheckCircle, sub: "92.1% tasa de verificación", accent: "border-t-2 border-t-emerald-600" },
            { label: "Patrones detectados", value: dashboardStats.patronesDetectados.toLocaleString(), icon: Brain, sub: "+8 nuevos patrones", accent: "border-t-2 border-t-gold" },
          ].map((s) => (
            <div key={s.label} className={`bg-white border border-doc-gray rounded-sm p-5 ${s.accent} shadow-sm`}>
              <div className="flex items-start justify-between mb-3">
                <s.icon className="w-4 h-4 text-gray-400" />
                <TrendingUp className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <div className="text-2xl font-bold text-inst-blue font-mono mb-0.5">{s.value}</div>
              <div className="text-xs text-gray-500 mb-1 font-medium">{s.label}</div>
              <div className="text-[10px] text-gray-400 font-mono">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cases (2/3) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar patrones, actores, lugares, fechas o testimonios…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-doc-gray rounded-sm pl-10 pr-10 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-inst-blue/50 focus:ring-1 focus:ring-inst-blue/20 shadow-sm transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white border border-doc-gray rounded-sm p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Filtros</span>
                {hasFilters && (
                  <button onClick={clearFilters} className="ml-auto text-[10px] text-inst-blue hover:text-rep-blue font-semibold">
                    Limpiar
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value as ViolationType | "")} className={selectCls}>
                  {violationTypes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as VerificationStatus | "")} className={selectCls}>
                  {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={filterPrivacy} onChange={(e) => setFilterPrivacy(e.target.value as PrivacyLevel | "")} className={selectCls}>
                  {privacyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className={selectCls}>
                  {years.map((y) => <option key={y} value={y}>{y || "Todos los años"}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-gray-500 font-mono">
                {filteredCases.length} resultado{filteredCases.length !== 1 ? "s" : ""}{hasFilters ? " (filtrado)" : ""}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {Math.min(filteredCases.length, 50)} de {mockCases.length} casos
              </span>
            </div>

            {/* Case list */}
            <div className="space-y-2">
              {filteredCases.length === 0 ? (
                <div className="bg-white border border-doc-gray rounded-sm p-12 text-center shadow-sm">
                  <Search className="w-7 h-7 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No se encontraron casos.</p>
                  <button onClick={clearFilters} className="text-inst-blue text-xs mt-2 hover:underline font-medium">Limpiar filtros</button>
                </div>
              ) : (
                filteredCases.map((c) => (
                  <Link
                    key={c.id}
                    href={`/caso/${c.id}`}
                    className="group block bg-white border border-doc-gray rounded-sm p-4 hover:border-gold/50 hover:shadow-md transition-all shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:block shrink-0 mt-0.5">
                        <div className="font-mono text-[10px] text-inst-blue/60 bg-inst-blue/5 border border-inst-blue/15 px-2 py-0.5 rounded-sm">{c.id}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-sm font-semibold text-inst-blue group-hover:text-rep-blue leading-tight transition-colors">
                            {c.title}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gold shrink-0 mt-0.5 transition-colors" />
                        </div>
                        <div className="text-[10px] font-mono text-inst-blue/50 mb-2 sm:hidden">{c.id}</div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{c.summary}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-semibold ${violationColors[c.type]}`}>
                            {violationLabels[c.type]}
                          </span>
                          <span className="text-doc-gray">·</span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                            <MapPin className="w-3 h-3" />{c.location}, {c.state}
                          </span>
                          <span className="text-doc-gray">·</span>
                          <span className="text-[11px] font-mono text-gray-400">{c.date}</span>
                          <div className="flex items-center gap-1.5 ml-auto">
                            <VerificationBadge status={c.verificationStatus} />
                            <PrivacyBadge level={c.privacyLevel} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* AI Panel (1/3) */}
          <div className="space-y-4">
            {/* AI analysis */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm overflow-hidden">
              <div className="bg-inst-blue/5 border-b border-doc-gray px-5 py-4 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm bg-inst-blue border border-inst-blue/20 flex items-center justify-center">
                  <Brain className="w-3.5 h-3.5 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-inst-blue">Análisis IA</div>
                  <div className="text-[9px] text-gold font-mono uppercase tracking-wider">Simulado · No verificado</div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {aiPatterns.map((p, i) => (
                  <div key={i} className="border border-doc-gray rounded-sm p-3 hover:border-gold/30 transition-colors">
                    <div className="text-xs text-gray-700 leading-snug mb-1.5">{p.label}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-inst-blue font-mono">{p.count}</span>
                      <span className="text-[10px] font-mono text-gray-400">{p.trend}</span>
                    </div>
                  </div>
                ))}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm">
                  <p className="text-[10px] text-amber-700 leading-relaxed">
                    Los patrones detectados por IA son orientativos. No sustituyen la verificación humana.
                  </p>
                </div>
              </div>
            </div>

            {/* Geographic distribution */}
            <div className="bg-white border border-doc-gray rounded-sm p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold text-inst-blue">Distribución geográfica</span>
              </div>
              <div className="space-y-3">
                {[
                  { state: "Distrito Capital", count: 1847, pct: 38 },
                  { state: "Zulia", count: 923, pct: 19 },
                  { state: "Carabobo", count: 612, pct: 13 },
                  { state: "Táchira", count: 487, pct: 10 },
                  { state: "Miranda", count: 398, pct: 8 },
                  { state: "Otros estados", count: 580, pct: 12 },
                ].map((row) => (
                  <div key={row.state} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{row.state}</span>
                      <span className="text-gray-400 font-mono">{row.count.toLocaleString()}</span>
                    </div>
                    <div className="h-1 bg-doc-gray rounded-full overflow-hidden">
                      <div className="h-full bg-inst-blue/40 rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white border border-doc-gray rounded-sm p-4 shadow-sm">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-3">Explorar</div>
              {[
                { href: "/timeline", label: "Cronología 2014–2024", icon: Clock },
                { href: "/relaciones", label: "Red de vínculos", icon: TrendingUp },
                { href: "/testimonio", label: "Enviar testimonio", icon: FileText },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm text-gray-600 hover:text-inst-blue hover:bg-inst-blue/5 transition-all group border-l-2 border-transparent hover:border-gold mb-1"
                >
                  <link.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gold" />
                  {link.label}
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto group-hover:text-inst-blue/40" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
