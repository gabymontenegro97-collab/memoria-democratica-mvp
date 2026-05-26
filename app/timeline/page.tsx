"use client";

import { useState } from "react";
import Link from "next/link";
import {
  mockTimelineEvents,
  timelineEventTypeLabels,
  type TimelineEventType,
} from "@/lib/mock-data";
import { ChevronRight, ExternalLink } from "lucide-react";

const typeColors: Record<TimelineEventType, { bg: string; border: string; text: string; dot: string }> = {
  protest:       { bg: "bg-orange-500/10",  border: "border-orange-500/30",  text: "text-orange-400",  dot: "bg-orange-400"  },
  detention:     { bg: "bg-red-500/10",     border: "border-red-500/30",     text: "text-red-400",     dot: "bg-red-400"     },
  report:        { bg: "bg-blue-500/10",    border: "border-blue-500/30",    text: "text-blue-400",    dot: "bg-blue-400"    },
  testimony:     { bg: "bg-violet-500/10",  border: "border-violet-500/30",  text: "text-violet-400",  dot: "bg-violet-400"  },
  election:      { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-400" },
  international: { bg: "bg-sky-500/10",     border: "border-sky-500/30",     text: "text-sky-400",     dot: "bg-sky-400"     },
  judicial:      { bg: "bg-amber-500/10",   border: "border-amber-500/30",   text: "text-amber-400",   dot: "bg-amber-400"   },
  crisis:        { bg: "bg-rose-500/10",    border: "border-rose-500/30",    text: "text-rose-400",    dot: "bg-rose-400"    },
};

const impactDot: Record<string, string> = {
  high: "w-3 h-3 bg-red-400/80",
  medium: "w-2.5 h-2.5 bg-amber-400/70",
  low: "w-2 h-2 bg-slate-500",
};

const allTypes: TimelineEventType[] = [
  "protest", "detention", "report", "election", "international", "judicial", "crisis"
];

const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export default function TimelinePage() {
  const [activeType, setActiveType] = useState<TimelineEventType | "">("");
  const [activeYear, setActiveYear] = useState<number | "">("");

  const filtered = mockTimelineEvents.filter((e) => {
    if (activeType && e.type !== activeType) return false;
    if (activeYear && e.year !== activeYear) return false;
    return true;
  });

  const byYear = years.reduce<Record<number, typeof mockTimelineEvents>>((acc, y) => {
    acc[y] = filtered.filter((e) => e.year === y);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            Sistema Nacional · Cronología
          </div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight mb-2">
            Línea de tiempo 2014–2024
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Una década de hechos documentados: represión, testimonios, informes internacionales y crisis políticas que definen la memoria democrática venezolana.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-10">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium mr-2">Filtrar:</span>

            {/* Type filters */}
            <button
              onClick={() => setActiveType("")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                activeType === ""
                  ? "bg-slate-700 border-slate-600 text-slate-200"
                  : "border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              Todos
            </button>
            {allTypes.map((t) => {
              const c = typeColors[t];
              const active = activeType === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveType(active ? "" : t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                    active
                      ? `${c.bg} ${c.border} ${c.text}`
                      : "border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                  }`}
                >
                  {timelineEventTypeLabels[t]}
                </button>
              );
            })}

            <div className="h-4 w-px bg-slate-700 mx-2 hidden sm:block" />

            {/* Year filters */}
            <button
              onClick={() => setActiveYear("")}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all border ${
                activeYear === ""
                  ? "bg-slate-700 border-slate-600 text-slate-200"
                  : "border-slate-700 text-slate-500 hover:border-slate-600"
              }`}
            >
              Todos
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(activeYear === y ? "" : y)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all border ${
                  activeYear === y
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-300"
                    : "border-slate-700 text-slate-500 hover:border-slate-600"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-3 items-center">
            <span className="text-[10px] text-slate-600">
              Mostrando {filtered.length} de {mockTimelineEvents.length} eventos
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80 block" />
                <span className="text-[10px] text-slate-500">Alto impacto</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70 block" />
                <span className="text-[10px] text-slate-500">Impacto medio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-[24px] sm:left-[32px] top-0 bottom-0 w-px timeline-connector" />

          <div className="space-y-1">
            {years.map((year) => {
              const events = byYear[year];
              if (events.length === 0) return null;

              return (
                <div key={year}>
                  {/* Year marker */}
                  <div className="relative flex items-center mb-4 mt-8 first:mt-0">
                    <div className="relative z-10 w-12 sm:w-16 shrink-0 flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border-2 border-blue-500/40 flex items-center justify-center font-mono font-bold text-blue-400 text-sm shadow-lg shadow-blue-900/20">
                        {year}
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-slate-800 ml-3" />
                  </div>

                  {/* Events for this year */}
                  <div className="space-y-3 ml-0">
                    {events.map((event, idx) => {
                      const c = typeColors[event.type];
                      return (
                        <div key={event.id} className="relative flex gap-4 sm:gap-6">
                          {/* Dot */}
                          <div className="relative z-10 shrink-0 flex items-start pt-4 w-12 sm:w-16 justify-center">
                            <div className={`rounded-full ${impactDot[event.impact]} ring-2 ring-slate-950`} />
                          </div>

                          {/* Card */}
                          <div
                            className={`flex-1 mb-3 p-4 rounded-xl border ${c.bg} ${c.border} hover:brightness-110 transition-all`}
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${c.text}`}>
                                {event.month}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${c.bg} ${c.border} ${c.text} font-medium`}>
                                {timelineEventTypeLabels[event.type]}
                              </span>
                              {event.impact === "high" && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-red-500/10 border-red-500/30 text-red-400 font-medium">
                                  Alto impacto
                                </span>
                              )}
                              {event.location && (
                                <span className="text-[10px] text-slate-500 ml-auto font-mono">
                                  {event.location}
                                </span>
                              )}
                            </div>

                            <h3 className="font-semibold text-slate-100 text-sm mb-1.5 leading-snug">
                              {event.title}
                            </h3>

                            <p className="text-xs text-slate-400 leading-relaxed mb-3">
                              {event.description}
                            </p>

                            {(event.sources || event.caseIds) && (
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 border-t border-white/5">
                                {event.sources && (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] text-slate-600 uppercase tracking-wider">Fuentes:</span>
                                    {event.sources.map((s) => (
                                      <span key={s} className="text-[10px] font-mono text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {event.caseIds && (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] text-slate-600 uppercase tracking-wider">Casos:</span>
                                    {event.caseIds.map((id) => (
                                      <Link
                                        key={id}
                                        href={`/caso/${id}`}
                                        className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded transition-colors"
                                      >
                                        {id}
                                        <ChevronRight className="w-2.5 h-2.5" />
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* End marker */}
          <div className="relative flex items-center mt-8">
            <div className="relative z-10 w-12 sm:w-16 shrink-0 flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <span className="text-[10px] text-slate-600 font-mono">hoy</span>
              </div>
            </div>
            <div className="flex-1 ml-3">
              <p className="text-xs text-slate-600 font-mono">
                La documentación continúa. El sistema sigue recibiendo nuevos testimonios.
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">Leyenda de categorías</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {allTypes.map((t) => {
              const c = typeColors[t];
              return (
                <div key={t} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${c.dot} shrink-0`} />
                  <span className="text-xs text-slate-400">{timelineEventTypeLabels[t]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
