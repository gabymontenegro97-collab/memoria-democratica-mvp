"use client";

import { useState } from "react";
import Link from "next/link";
import {
  mockTimelineEvents,
  timelineEventTypeLabels,
  type TimelineEventType,
} from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";

const typeColors: Record<TimelineEventType, {
  bg: string; border: string; text: string; dot: string; leftBorder: string;
}> = {
  protest:       { bg: "bg-amber-50",    border: "border-amber-200",   text: "text-amber-700",   dot: "bg-amber-500",   leftBorder: "border-l-amber-500"   },
  detention:     { bg: "bg-red-50",      border: "border-red-200",     text: "text-rep-red",     dot: "bg-rep-red",     leftBorder: "border-l-red-600"     },
  report:        { bg: "bg-blue-50",     border: "border-blue-200",    text: "text-inst-blue",   dot: "bg-inst-blue",   leftBorder: "border-l-inst-blue"   },
  testimony:     { bg: "bg-violet-50",   border: "border-violet-200",  text: "text-violet-700",  dot: "bg-violet-600",  leftBorder: "border-l-violet-600"  },
  election:      { bg: "bg-emerald-50",  border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-600", leftBorder: "border-l-emerald-600" },
  international: { bg: "bg-sky-50",      border: "border-sky-200",     text: "text-sky-700",     dot: "bg-sky-600",     leftBorder: "border-l-sky-600"     },
  judicial:      { bg: "bg-orange-50",   border: "border-orange-200",  text: "text-orange-700",  dot: "bg-orange-500",  leftBorder: "border-l-orange-500"  },
  crisis:        { bg: "bg-rose-50",     border: "border-rose-200",    text: "text-rose-700",    dot: "bg-rose-600",    leftBorder: "border-l-rose-600"    },
};

const impactSize: Record<string, string> = {
  high:   "w-3.5 h-3.5",
  medium: "w-2.5 h-2.5",
  low:    "w-2 h-2",
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
    <div className="min-h-screen bg-archive">
      {/* Page header */}
      <div className="bg-inst-blue">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-px h-5 bg-gold" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
              Sistema Nacional · Cronología
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Línea de tiempo 2014–2024
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Una década de hechos documentados: represión, testimonios, informes internacionales y crisis políticas que definen la memoria democrática venezolana.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white border border-doc-gray rounded-sm shadow-sm p-5 mb-10">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mr-2">Filtrar:</span>

            {/* Type filters */}
            <button
              onClick={() => setActiveType("")}
              className={`px-3 py-1 rounded-sm text-xs font-medium transition-all border ${
                activeType === ""
                  ? "bg-inst-blue border-inst-blue text-white"
                  : "border-doc-gray text-gray-500 hover:border-inst-blue/30 hover:text-gray-700"
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
                  className={`px-3 py-1 rounded-sm text-xs font-medium transition-all border ${
                    active
                      ? `${c.bg} ${c.border} ${c.text}`
                      : "border-doc-gray text-gray-500 hover:border-inst-blue/30 hover:text-gray-700"
                  }`}
                >
                  {timelineEventTypeLabels[t]}
                </button>
              );
            })}

            <div className="h-4 w-px bg-doc-gray mx-2 hidden sm:block" />

            {/* Year filters */}
            <button
              onClick={() => setActiveYear("")}
              className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-all border ${
                activeYear === ""
                  ? "bg-inst-blue border-inst-blue text-white"
                  : "border-doc-gray text-gray-500 hover:border-inst-blue/30"
              }`}
            >
              Todos
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(activeYear === y ? "" : y)}
                className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-all border ${
                  activeYear === y
                    ? "bg-gold/10 border-gold text-gold"
                    : "border-doc-gray text-gray-500 hover:border-inst-blue/30"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-3 items-center pt-3 border-t border-doc-gray">
            <span className="text-[10px] text-gray-400 font-mono">
              Mostrando {filtered.length} de {mockTimelineEvents.length} eventos
            </span>
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-rep-red block" />
                <span className="text-[10px] text-gray-500">Alto impacto</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                <span className="text-[10px] text-gray-500">Impacto medio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gold connector line */}
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
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-inst-blue border-2 border-gold/40 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md">
                        {year}
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-doc-gray ml-3" />
                  </div>

                  {/* Events for this year */}
                  <div className="space-y-3">
                    {events.map((event) => {
                      const c = typeColors[event.type];
                      return (
                        <div key={event.id} className="relative flex gap-4 sm:gap-6">
                          {/* Impact dot */}
                          <div className="relative z-10 shrink-0 flex items-start pt-4 w-12 sm:w-16 justify-center">
                            <div
                              className={`rounded-full ${impactSize[event.impact]} ${c.dot} ring-2 ring-archive`}
                            />
                          </div>

                          {/* Card */}
                          <div
                            className={`flex-1 mb-3 p-5 bg-white border border-l-4 ${c.border} ${c.leftBorder} rounded-sm shadow-sm hover:shadow-md transition-all`}
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${c.text}`}>
                                {event.month}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-sm border ${c.bg} ${c.border} ${c.text} font-medium`}>
                                {timelineEventTypeLabels[event.type]}
                              </span>
                              {event.impact === "high" && (
                                <span className="text-[10px] px-2 py-0.5 rounded-sm border bg-rep-red/5 border-rep-red/20 text-rep-red font-medium">
                                  Alto impacto
                                </span>
                              )}
                              {event.location && (
                                <span className="text-[10px] text-gray-400 ml-auto font-mono">
                                  {event.location}
                                </span>
                              )}
                            </div>

                            <h3 className="font-semibold text-inst-blue text-sm mb-1.5 leading-snug">
                              {event.title}
                            </h3>

                            <p className="text-xs text-gray-500 leading-relaxed mb-3">
                              {event.description}
                            </p>

                            {(event.sources || event.caseIds) && (
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2.5 border-t border-doc-gray">
                                {event.sources && (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Fuentes:</span>
                                    {event.sources.map((s) => (
                                      <span key={s} className="text-[10px] font-mono text-gray-500 bg-archive px-1.5 py-0.5 rounded-sm border border-doc-gray">
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {event.caseIds && (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Casos:</span>
                                    {event.caseIds.map((id) => (
                                      <Link
                                        key={id}
                                        href={`/caso/${id}`}
                                        className="inline-flex items-center gap-1 text-[10px] font-mono text-inst-blue hover:text-rep-blue bg-inst-blue/5 border border-inst-blue/20 px-1.5 py-0.5 rounded-sm transition-colors"
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-white border border-doc-gray flex items-center justify-center shadow-sm">
                <span className="text-[10px] text-gray-400 font-mono">hoy</span>
              </div>
            </div>
            <div className="flex-1 ml-3">
              <p className="text-xs text-gray-400 font-mono">
                La documentación continúa. El sistema sigue recibiendo nuevos testimonios.
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 p-5 bg-white border border-doc-gray rounded-sm shadow-sm">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-4">Leyenda de categorías</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allTypes.map((t) => {
              const c = typeColors[t];
              return (
                <div key={t} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${c.dot} shrink-0`} />
                  <span className="text-xs text-gray-500">{timelineEventTypeLabels[t]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
