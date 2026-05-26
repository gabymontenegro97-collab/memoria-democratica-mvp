import { notFound } from "next/navigation";
import Link from "next/link";
import {
  mockCases,
  violationLabels,
  verificationLabels,
  privacyLabels,
  profileLabels,
} from "@/lib/mock-data";
import {
  ChevronLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  Brain,
  MapPin,
  Calendar,
  User,
  Tag,
  AlertTriangle,
  Link2,
} from "lucide-react";

export function generateStaticParams() {
  return mockCases.map((c) => ({ id: c.id }));
}

const violationColors: Record<string, string> = {
  detencion_arbitraria: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  tortura: "text-red-400 bg-red-500/10 border-red-500/20",
  desaparicion_forzada: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  ejecucion_extrajudicial: "text-red-500 bg-red-600/10 border-red-500/20",
  persecucion_politica: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  exilio: "text-slate-300 bg-slate-700/40 border-slate-600",
  censura: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  otro: "text-slate-400 bg-slate-800 border-slate-700",
};

function VerificationBadge({ status }: { status: string }) {
  if (status === "verified")
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle className="w-3.5 h-3.5" />
        Verificado
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock className="w-3.5 h-3.5" />
        En revisión
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/60 text-slate-400 border border-slate-700">
      <AlertCircle className="w-3.5 h-3.5" />
      Sin verificar
    </span>
  );
}

function PrivacyBadge({ level }: { level: string }) {
  const map: Record<string, { icon: React.ElementType; cls: string; label: string }> = {
    public: { icon: Eye, cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Público" },
    anonymized: { icon: Shield, cls: "bg-violet-500/10 text-violet-400 border-violet-500/20", label: "Anonimizado" },
    private: { icon: EyeOff, cls: "bg-slate-700/60 text-slate-400 border-slate-700", label: "Privado" },
  };
  const { icon: Icon, cls, label } = map[level] || map.private;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

export default async function CasoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caso = mockCases.find((c) => c.id === id);
  if (!caso) notFound();

  const vColor = violationColors[caso.type] || violationColors.otro;
  const isPrivate = caso.privacyLevel === "private";

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/dashboard" className="hover:text-slate-300 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-mono text-slate-400">{caso.id}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Volver al dashboard
                </Link>
                <div className="font-mono text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  {caso.id}
                </div>
              </div>

              <h1 className="text-2xl font-bold text-slate-100 leading-tight mb-4">
                {caso.title}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${vColor}`}>
                  <Tag className="w-3.5 h-3.5" />
                  {violationLabels[caso.type]}
                </span>
                <VerificationBadge status={caso.verificationStatus} />
                <PrivacyBadge level={caso.privacyLevel} />
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { icon: MapPin, label: "Ubicación", value: `${caso.location}, ${caso.state}` },
                  { icon: Calendar, label: "Fecha", value: caso.date },
                  { icon: User, label: "Perfil", value: profileLabels[caso.reporterProfile] },
                  { icon: Eye, label: "Privacidad", value: privacyLabels[caso.privacyLevel] },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <m.icon className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{m.label}</span>
                    </div>
                    <div className="text-sm text-slate-200 font-medium leading-tight">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Resumen del caso</div>
                <p className="text-sm text-slate-300 leading-relaxed">{caso.summary}</p>
              </div>
            </div>

            {/* Full testimony */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h2 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <FileIcon />
                Testimonio completo
              </h2>

              {isPrivate ? (
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                  <EyeOff className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400">
                      Este testimonio tiene nivel de privacidad <strong className="text-slate-300">Privado</strong>.
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Acceso restringido a investigadores verificados con credenciales del sistema.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm prose-invert max-w-none">
                  {caso.fullTestimony.split("\n\n").map((para, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* AI Analysis */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">Análisis IA</div>
                  <div className="text-[10px] text-violet-400/70 font-mono">Asistido · No sustitutivo</div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Keywords */}
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Palabras clave</div>
                  <div className="flex flex-wrap gap-1.5">
                    {caso.aiAnalysis.keywords.map((kw) => (
                      <span key={kw} className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] rounded-md font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actors */}
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Actores mencionados</div>
                  <div className="space-y-1.5">
                    {caso.aiAnalysis.actorsMentioned.map((actor) => (
                      <div key={actor} className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        <span className="text-slate-300">{actor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Places */}
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Lugares mencionados</div>
                  <div className="space-y-1.5">
                    {caso.aiAnalysis.placesMentioned.map((place) => (
                      <div key={place} className="flex items-center gap-2 text-xs">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="text-slate-300">{place}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connections */}
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Posibles conexiones</div>
                  <div className="space-y-1.5">
                    {caso.aiAnalysis.possibleConnections.map((conn) => {
                      const [caseId, ...rest] = conn.split(" — ");
                      const existingCase = mockCases.find((c) => c.id === caseId.trim());
                      return (
                        <div key={conn} className="text-[11px] text-slate-400 bg-slate-800/50 rounded-lg p-2.5">
                          <div className="flex items-start gap-1.5">
                            <Link2 className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                            <div>
                              {existingCase ? (
                                <Link
                                  href={`/caso/${caseId.trim()}`}
                                  className="font-mono text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  {caseId.trim()}
                                </Link>
                              ) : (
                                <span className="font-mono text-slate-500">{caseId.trim()}</span>
                              )}
                              {rest.length > 0 && (
                                <span className="text-slate-500"> — {rest.join(" — ")}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AI disclaimer */}
              <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-400/80 leading-relaxed">
                  La IA no sustituye la verificación humana. Este análisis es orientativo y debe ser validado por investigadores especializados.
                </p>
              </div>
            </div>

            {/* Traceability */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <div className="text-sm font-semibold text-slate-200">Trazabilidad</div>
              </div>

              <div className="relative">
                <div className="absolute left-[7px] top-0 bottom-0 w-px bg-slate-800" />
                <div className="space-y-4">
                  {caso.traceability.map((entry, i) => (
                    <div key={i} className="relative flex gap-4">
                      <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-emerald-500/40 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-300 mb-0.5">{entry.action}</div>
                        <div className="text-[11px] text-slate-500 mb-1">
                          <span className="font-mono">{entry.actor}</span>
                          <span className="mx-1.5 text-slate-700">·</span>
                          <span className="font-mono">{entry.date}</span>
                        </div>
                        {entry.note && (
                          <div className="text-[11px] text-slate-600 italic leading-relaxed">
                            {entry.note}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related links */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">
                Explorar más
              </div>
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all group"
                >
                  <span className="flex-1">Todos los casos</span>
                  <ChevronLeft className="w-3.5 h-3.5 rotate-180 text-slate-600 group-hover:text-slate-400" />
                </Link>
                <Link
                  href="/relaciones"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all group"
                >
                  <span className="flex-1">Red de vínculos</span>
                  <ChevronLeft className="w-3.5 h-3.5 rotate-180 text-slate-600 group-hover:text-slate-400" />
                </Link>
                <Link
                  href="/timeline"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all group"
                >
                  <span className="flex-1">Cronología</span>
                  <ChevronLeft className="w-3.5 h-3.5 rotate-180 text-slate-600 group-hover:text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
