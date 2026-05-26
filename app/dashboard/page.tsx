"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  EyeOff,
  Shield,
  ChevronRight,
  TrendingUp,
  BarChart3,
  MapPin,
  Brain,
  X,
} from "lucide-react";
import {
  mockCases,
  dashboardStats,
  violationLabels,
  verificationLabels,
  privacyLabels,
  type ViolationType,
  type VerificationStatus,
  type PrivacyLevel,
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
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle className="w-3 h-3" />
        Verificado
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock className="w-3 h-3" />
        En revisión
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-700/60 text-slate-400 border border-slate-700">
      <AlertCircle className="w-3 h-3" />
      Sin verificar
    </span>
  );
}

function PrivacyBadge({ level }: { level: PrivacyLevel }) {
  const map = {
    public: { icon: Eye, cls: "text-blue-400 bg-blue-500/10 border-blue-500/20", label: "Público" },
    anonymized: { icon: Shield, cls: "text-violet-400 bg-violet-500/10 border-violet-500/20", label: "Anonimizado" },
    private: { icon: EyeOff, cls: "text-slate-400 bg-slate-700/50 border-slate-700", label: "Privado" },
  };
  const { icon: Icon, cls, label } = map[level];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${cls}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

const violationColors: Record<ViolationType, string> = {
  detencion_arbitraria: "text-amber-400",
  tortura: "text-red-400",
  desaparicion_forzada: "text-rose-400",
  ejecucion_extrajudicial: "text-red-500",
  persecucion_politica: "text-orange-400",
  exilio: "text-slate-300",
  censura: "text-purple-400",
  otro: "text-slate-400",
};

const aiPatterns = [
  { label: "Patrón: SEBIN + aislamiento > 30 días", count: 23, trend: "+4 este mes" },
  { label: "Patrón: FAES + escena manipulada", count: 18, trend: "+2 este mes" },
  { label: "Co-ocurrencia: Táchira + GNB + protestas", count: 31, trend: "Estable" },
  { label: "Patrón: detención sin orden + Caracas", count: 67, trend: "+12 este mes" },
  { label: "Clúster temporal: Jul 2024 +280%", count: 112, trend: "Alerta nueva" },
];

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
      const matchType = !filterType || c.type === filterType;
      const matchStatus = !filterStatus || c.verificationStatus === filterStatus;
      const matchPrivacy = !filterPrivacy || c.privacyLevel === filterPrivacy;
      const matchYear = !filterYear || String(c.year) === filterYear;
      return matchSearch && matchType && matchStatus && matchPrivacy && matchYear;
    });
  }, [search, filterType, filterStatus, filterPrivacy, filterYear]);

  const hasFilters = search || filterType || filterStatus || filterPrivacy || filterYear;

  const clearFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterStatus("");
    setFilterPrivacy("");
    setFilterYear("");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
            Sistema Nacional · Dashboard analítico
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                Panel de casos documentados
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {dashboardStats.testimonios.toLocaleString()} testimonios ·{" "}
                {dashboardStats.casosVerificados} verificados · Actualizado hoy
              </p>
            </div>
            <Link
              href="/testimonio"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shrink-0"
            >
              <FileText className="w-4 h-4" />
              Nuevo testimonio
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            {
              label: "Testimonios",
              value: dashboardStats.testimonios.toLocaleString(),
              icon: FileText,
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "border-blue-500/20",
              sub: "+127 este mes",
            },
            {
              label: "Documentos",
              value: dashboardStats.documentos.toLocaleString(),
              icon: BarChart3,
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              border: "border-violet-500/20",
              sub: "+2,340 este mes",
            },
            {
              label: "Casos verificados",
              value: dashboardStats.casosVerificados.toLocaleString(),
              icon: CheckCircle,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20",
              sub: "92.1% de tasa de verificación",
            },
            {
              label: "Patrones detectados",
              value: dashboardStats.patronesDetectados.toLocaleString(),
              icon: Brain,
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              border: "border-amber-500/20",
              sub: "+8 nuevos patrones",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${s.bg} border ${s.border} flex items-center justify-center`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <div className="text-2xl font-bold text-slate-100 font-mono mb-0.5">{s.value}</div>
              <div className="text-xs text-slate-400 mb-1">{s.label}</div>
              <div className="text-[10px] text-slate-600 font-mono">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Main content: cases + AI panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cases panel (2/3) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar patrones, actores, lugares, fechas o testimonios…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Filtros</span>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="ml-auto text-[10px] text-blue-400 hover:text-blue-300 font-mono"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as ViolationType | "")}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 cursor-pointer"
                >
                  {violationTypes.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as VerificationStatus | "")}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 cursor-pointer"
                >
                  {statusOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <select
                  value={filterPrivacy}
                  onChange={(e) => setFilterPrivacy(e.target.value as PrivacyLevel | "")}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 cursor-pointer"
                >
                  {privacyOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 cursor-pointer"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y || "Todos los años"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-slate-500 font-mono">
                {filteredCases.length} resultado{filteredCases.length !== 1 ? "s" : ""}
                {hasFilters ? " (filtrado)" : ""}
              </span>
              <span className="text-xs text-slate-600 font-mono">
                Mostrando {Math.min(filteredCases.length, 50)} de {mockCases.length} casos
              </span>
            </div>

            {/* Case list */}
            <div className="space-y-2">
              {filteredCases.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
                  <Search className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No se encontraron casos con los filtros aplicados.</p>
                  <button onClick={clearFilters} className="text-blue-400 text-xs mt-2 hover:underline">
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                filteredCases.map((c) => (
                  <Link
                    key={c.id}
                    href={`/caso/${c.id}`}
                    className="group block bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-600 hover:bg-slate-900/80 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:block shrink-0 mt-0.5">
                        <div className="font-mono text-[11px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{c.id}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-sm font-semibold text-slate-200 group-hover:text-slate-100 leading-tight">
                            {c.title}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5 transition-colors" />
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 mb-2 sm:hidden">{c.id}</div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{c.summary}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-medium ${violationColors[c.type]}`}>
                            {violationLabels[c.type]}
                          </span>
                          <span className="text-slate-700">·</span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                            <MapPin className="w-3 h-3" />
                            {c.location}, {c.state}
                          </span>
                          <span className="text-slate-700">·</span>
                          <span className="text-[11px] font-mono text-slate-500">{c.date}</span>
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

          {/* AI Summary Panel (1/3) */}
          <div className="space-y-4">
            {/* AI Analysis */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                  <Brain className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">Análisis IA</div>
                  <div className="text-[10px] text-violet-400/70 font-mono">Simulado · No verificado</div>
                </div>
              </div>

              <div className="space-y-3">
                {aiPatterns.map((p, i) => (
                  <div key={i} className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3">
                    <div className="text-xs text-slate-300 leading-snug mb-1.5">{p.label}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-100 font-mono">{p.count}</span>
                      <span className="text-[10px] font-mono text-slate-500">{p.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
                <p className="text-[10px] text-amber-400/80 leading-relaxed">
                  Los patrones detectados por IA son orientativos. No sustituyen la verificación humana.
                </p>
              </div>
            </div>

            {/* Geographic distribution */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-200">Distribución geográfica</span>
              </div>
              <div className="space-y-2">
                {[
                  { state: "Distrito Capital", count: 1847, pct: 38 },
                  { state: "Zulia", count: 923, pct: 19 },
                  { state: "Carabobo", count: 612, pct: 13 },
                  { state: "Táchira", count: 487, pct: 10 },
                  { state: "Miranda", count: 398, pct: 8 },
                  { state: "Otros", count: 580, pct: 12 },
                ].map((row) => (
                  <div key={row.state} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{row.state}</span>
                      <span className="text-slate-500 font-mono">{row.count.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500/60 rounded-full transition-all"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">Explorar</div>
              <div className="space-y-1">
                {[
                  { href: "/timeline", label: "Cronología 2014–2024", icon: Clock },
                  { href: "/relaciones", label: "Red de vínculos", icon: TrendingUp },
                  { href: "/testimonio", label: "Enviar testimonio", icon: FileText },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all group"
                  >
                    <link.icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                    {link.label}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-700 ml-auto group-hover:text-slate-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
