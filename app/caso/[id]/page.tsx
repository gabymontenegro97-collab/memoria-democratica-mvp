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
  detencion_arbitraria:   "text-amber-700 bg-amber-50 border-amber-200",
  tortura:                "text-rep-red bg-red-50 border-red-200",
  desaparicion_forzada:   "text-rose-700 bg-rose-50 border-rose-200",
  ejecucion_extrajudicial:"text-red-700 bg-red-50 border-red-200",
  persecucion_politica:   "text-orange-700 bg-orange-50 border-orange-200",
  exilio:                 "text-gray-600 bg-gray-100 border-gray-200",
  censura:                "text-violet-700 bg-violet-50 border-violet-200",
  otro:                   "text-gray-500 bg-gray-50 border-gray-200",
};

function VerificationBadge({ status }: { status: string }) {
  if (status === "verified")
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle className="w-3.5 h-3.5" />
        Verificado
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3.5 h-3.5" />
        En revisión
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
      <AlertCircle className="w-3.5 h-3.5" />
      Sin verificar
    </span>
  );
}

function PrivacyBadge({ level }: { level: string }) {
  const map: Record<string, { icon: React.ElementType; cls: string; label: string }> = {
    public:     { icon: Eye,    cls: "bg-inst-blue/5 text-inst-blue border-inst-blue/20",    label: "Público"      },
    anonymized: { icon: Shield, cls: "bg-gold/5 text-gold border-gold/30",                  label: "Anonimizado"  },
    private:    { icon: EyeOff, cls: "bg-gray-100 text-gray-500 border-gray-200",            label: "Privado"      },
  };
  const { icon: Icon, cls, label } = map[level] || map.private;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold border ${cls}`}>
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
    <div className="min-h-screen bg-archive">
      {/* Page header */}
      <div className="bg-inst-blue">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-5">
            <Link href="/" className="hover:text-white/70 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-white/70 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="font-mono text-gold/80">{caso.id}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-px h-5 bg-gold" />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
                  Expediente · {caso.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {caso.title}
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors shrink-0 mt-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Volver al dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case header card */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm">
              <div className="px-7 py-5 border-b border-doc-gray flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold border ${vColor}`}>
                  <Tag className="w-3.5 h-3.5" />
                  {violationLabels[caso.type]}
                </span>
                <VerificationBadge status={caso.verificationStatus} />
                <PrivacyBadge level={caso.privacyLevel} />
                <span className="ml-auto font-mono text-[10px] text-gray-400 bg-inst-blue/5 border border-inst-blue/15 px-2.5 py-1 rounded-sm">
                  {caso.id}
                </span>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-doc-gray border-b border-doc-gray">
                {[
                  { icon: MapPin,    label: "Ubicación",  value: `${caso.location}, ${caso.state}` },
                  { icon: Calendar,  label: "Fecha",      value: caso.date                          },
                  { icon: User,      label: "Perfil",     value: profileLabels[caso.reporterProfile]},
                  { icon: Eye,       label: "Privacidad", value: privacyLabels[caso.privacyLevel]   },
                ].map((m) => (
                  <div key={m.label} className="bg-white px-5 py-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <m.icon className="w-3 h-3 text-gold" />
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{m.label}</span>
                    </div>
                    <div className="text-sm text-inst-blue font-semibold leading-tight">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="px-7 py-6">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-3">Resumen del caso</div>
                <p className="text-sm text-gray-600 leading-relaxed">{caso.summary}</p>
              </div>
            </div>

            {/* Full testimony */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm">
              <div className="px-7 py-5 border-b border-doc-gray flex items-center gap-2">
                <FileIcon />
                <h2 className="text-sm font-semibold text-inst-blue">Testimonio completo</h2>
              </div>

              <div className="px-7 py-6">
                {isPrivate ? (
                  <div className="flex items-center gap-3 p-4 bg-archive border border-doc-gray rounded-sm">
                    <EyeOff className="w-5 h-5 text-gray-400 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Este testimonio tiene nivel de privacidad{" "}
                        <strong className="text-inst-blue">Privado</strong>.
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Acceso restringido a investigadores verificados con credenciales del sistema.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {caso.fullTestimony.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm text-gray-600 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* AI Analysis */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm overflow-hidden">
              {/* Panel header */}
              <div className="bg-inst-blue px-5 py-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-sm bg-white/10 border border-white/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Análisis IA</div>
                  <div className="text-[10px] text-gold/70 font-mono">Asistido · No sustitutivo</div>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Keywords */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2">Palabras clave</div>
                  <div className="flex flex-wrap gap-1.5">
                    {caso.aiAnalysis.keywords.map((kw) => (
                      <span key={kw} className="px-2 py-0.5 bg-inst-blue/5 border border-inst-blue/15 text-inst-blue text-[11px] rounded-sm font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actors */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2">Actores mencionados</div>
                  <div className="space-y-1.5">
                    {caso.aiAnalysis.actorsMentioned.map((actor) => (
                      <div key={actor} className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-rep-red shrink-0" />
                        <span className="text-gray-600">{actor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Places */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2">Lugares mencionados</div>
                  <div className="space-y-1.5">
                    {caso.aiAnalysis.placesMentioned.map((place) => (
                      <div key={place} className="flex items-center gap-2 text-xs">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="text-gray-600">{place}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connections */}
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2">Posibles conexiones</div>
                  <div className="space-y-1.5">
                    {caso.aiAnalysis.possibleConnections.map((conn) => {
                      const [caseId, ...rest] = conn.split(" — ");
                      const existingCase = mockCases.find((c) => c.id === caseId.trim());
                      return (
                        <div key={conn} className="text-[11px] text-gray-500 bg-archive border border-doc-gray rounded-sm p-2.5">
                          <div className="flex items-start gap-1.5">
                            <Link2 className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                            <div>
                              {existingCase ? (
                                <Link
                                  href={`/caso/${caseId.trim()}`}
                                  className="font-mono text-inst-blue hover:text-rep-blue transition-colors font-medium"
                                >
                                  {caseId.trim()}
                                </Link>
                              ) : (
                                <span className="font-mono text-gray-400">{caseId.trim()}</span>
                              )}
                              {rest.length > 0 && (
                                <span className="text-gray-400"> — {rest.join(" — ")}</span>
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
              <div className="mx-5 mb-5 p-3 bg-amber-50 border border-amber-200 rounded-sm flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  La IA no sustituye la verificación humana. Este análisis es orientativo y debe ser validado por investigadores especializados.
                </p>
              </div>
            </div>

            {/* Traceability */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm">
              <div className="px-5 py-4 border-b border-doc-gray flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <div className="text-sm font-semibold text-inst-blue">Trazabilidad</div>
              </div>

              <div className="px-5 py-5">
                <div className="relative">
                  <div className="absolute left-[7px] top-0 bottom-0 w-px bg-doc-gray" />
                  <div className="space-y-4">
                    {caso.traceability.map((entry, i) => (
                      <div key={i} className="relative flex gap-4">
                        <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-white border-2 border-gold shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-inst-blue mb-0.5">{entry.action}</div>
                          <div className="text-[11px] text-gray-400 mb-1">
                            <span className="font-mono">{entry.actor}</span>
                            <span className="mx-1.5 text-gray-300">·</span>
                            <span className="font-mono">{entry.date}</span>
                          </div>
                          {entry.note && (
                            <div className="text-[11px] text-gray-400 italic leading-relaxed">
                              {entry.note}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related links */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm p-5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">
                Explorar más
              </div>
              <div className="space-y-1">
                {[
                  { href: "/dashboard",  label: "Todos los casos"  },
                  { href: "/relaciones", label: "Red de vínculos"  },
                  { href: "/timeline",   label: "Cronología"       },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-sm text-xs text-gray-500 hover:text-inst-blue hover:bg-archive transition-all group"
                  >
                    <span className="flex-1">{link.label}</span>
                    <ChevronLeft className="w-3.5 h-3.5 rotate-180 text-gray-300 group-hover:text-gold transition-colors" />
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

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
