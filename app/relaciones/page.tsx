"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { networkNodes, networkEdges, type NodeType, type NetworkNode } from "@/lib/mock-data";
import { Info, ChevronRight } from "lucide-react";

const nodeColors: Record<NodeType, { fill: string; stroke: string; text: string; legend: string }> = {
  actor:       { fill: "#7f1d1d",   stroke: "#f87171",  text: "#fecaca",  legend: "Actores perpetradores" },
  institution: { fill: "#1e3a8a",   stroke: "#60a5fa",  text: "#bfdbfe",  legend: "Instituciones" },
  location:    { fill: "#14532d",   stroke: "#4ade80",  text: "#bbf7d0",  legend: "Territorios" },
  event:       { fill: "#78350f",   stroke: "#fbbf24",  text: "#fde68a",  legend: "Eventos" },
  testimony:   { fill: "#3b0764",   stroke: "#c084fc",  text: "#e9d5ff",  legend: "Testimonios" },
};

const nodeRadius: Record<string, number> = { lg: 24, md: 18, sm: 13 };

export default function RelacionesPage() {
  const [hovered, setHovered] = useState<NetworkNode | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<NodeType>>(
    new Set(["actor", "institution", "location", "event", "testimony"])
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleType = (t: NodeType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) {
        if (next.size > 1) next.delete(t);
      } else {
        next.add(t);
      }
      return next;
    });
  };

  const visibleNodes = networkNodes.filter((n) => activeTypes.has(n.type));
  const visibleIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = networkEdges.filter(
    (e) => visibleIds.has(e.source) && visibleIds.has(e.target)
  );

  const hoveredConnections = hovered
    ? new Set([
        hovered.id,
        ...networkEdges
          .filter((e) => e.source === hovered.id || e.target === hovered.id)
          .flatMap((e) => [e.source, e.target]),
      ])
    : null;

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const nodeById = (id: string) => networkNodes.find((n) => n.id === id);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            Sistema Nacional · Análisis de relaciones
          </div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight mb-2">
            Red de vínculos
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Visualización de las relaciones entre actores, instituciones, territorios, eventos y testimonios documentados. Pasa el cursor sobre un nodo para explorar sus conexiones.
          </p>
        </div>

        {/* Controls + Graph */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Legend / filters */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">
                Categorías
              </div>
              <div className="space-y-2">
                {(Object.entries(nodeColors) as [NodeType, typeof nodeColors[NodeType]][]).map(([type, colors]) => {
                  const active = activeTypes.has(type);
                  const count = networkNodes.filter((n) => n.type === type).length;
                  return (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all border ${
                        active
                          ? "border-slate-600 bg-slate-800/50 text-slate-200"
                          : "border-transparent bg-slate-900 text-slate-600"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border"
                        style={{ backgroundColor: active ? colors.fill : "#0f172a", borderColor: active ? colors.stroke : "#334155" }}
                      />
                      <span className="flex-1 text-left">{colors.legend}</span>
                      <span className="font-mono text-slate-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hovered node detail */}
            {hovered ? (
              <div
                className="bg-slate-900 border rounded-xl p-4 transition-all"
                style={{ borderColor: nodeColors[hovered.type].stroke + "40" }}
              >
                <div className="text-[10px] uppercase tracking-wider font-medium mb-2"
                  style={{ color: nodeColors[hovered.type].text }}>
                  {nodeColors[hovered.type].legend}
                </div>
                <h3 className="font-bold text-slate-100 text-sm mb-1">{hovered.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{hovered.description}</p>

                <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Conexiones directas</div>
                <div className="space-y-1">
                  {networkEdges
                    .filter((e) => e.source === hovered.id || e.target === hovered.id)
                    .slice(0, 6)
                    .map((e, i) => {
                      const otherId = e.source === hovered.id ? e.target : e.source;
                      const other = nodeById(otherId);
                      if (!other) return null;
                      return (
                        <div key={i} className="flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: nodeColors[other.type].stroke }}
                          />
                          <span className="text-[11px] text-slate-400">{other.label}</span>
                        </div>
                      );
                    })}
                </div>

                {hovered.type === "testimony" && (
                  <Link
                    href={`/caso/${hovered.label}`}
                    className="inline-flex items-center gap-1 mt-3 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Ver caso completo
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <Info className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600">
                  Pasa el cursor sobre un nodo para ver sus detalles y conexiones.
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">
                Red — resumen
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Nodos visibles</span>
                  <span className="text-slate-300 font-mono">{visibleNodes.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Vínculos visibles</span>
                  <span className="text-slate-300 font-mono">{visibleEdges.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total nodos</span>
                  <span className="text-slate-300 font-mono">{networkNodes.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total vínculos</span>
                  <span className="text-slate-300 font-mono">{networkEdges.length}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 mt-3 leading-relaxed">
                Red simplificada · Visualización estática. En producción: fuerza dirigida, filtros avanzados y exportación.
              </p>
            </div>
          </div>

          {/* SVG Graph */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Red de relaciones — {visibleNodes.length} nodos · {visibleEdges.length} vínculos
                </span>
                <span className="text-[10px] text-slate-600 font-mono">
                  Hover para explorar
                </span>
              </div>

              <div className="relative">
                <svg
                  viewBox="0 0 1160 520"
                  className="w-full h-auto"
                  style={{ background: "transparent" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(30,41,59,0.5)" strokeWidth="0.5" />
                    </pattern>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <rect width="1160" height="520" fill="url(#grid)" />

                  {/* Edges */}
                  {visibleEdges.map((edge, i) => {
                    const src = nodeById(edge.source);
                    const tgt = nodeById(edge.target);
                    if (!src || !tgt) return null;
                    const isHighlighted = hoveredConnections
                      ? hoveredConnections.has(edge.source) && hoveredConnections.has(edge.target)
                      : false;
                    const isDimmed = hoveredConnections && !isHighlighted;
                    return (
                      <line
                        key={i}
                        x1={src.x} y1={src.y}
                        x2={tgt.x} y2={tgt.y}
                        stroke={isHighlighted ? "#60a5fa" : "#334155"}
                        strokeWidth={isHighlighted ? 1.5 : 0.8}
                        strokeOpacity={isDimmed ? 0.1 : isHighlighted ? 0.8 : 0.35}
                        className="transition-all duration-150"
                      />
                    );
                  })}

                  {/* Nodes */}
                  {visibleNodes.map((node) => {
                    const c = nodeColors[node.type];
                    const r = nodeRadius[node.size];
                    const isDimmed = hoveredConnections && !hoveredConnections.has(node.id);
                    const isHovered = hovered?.id === node.id;
                    const isConnected = hoveredConnections?.has(node.id) && !isHovered;

                    // Split label for multi-line text
                    const lines = node.label.split("\n");

                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setHovered(node)}
                        style={{ transition: "opacity 0.15s" }}
                        opacity={isDimmed ? 0.2 : 1}
                      >
                        {/* Outer glow ring on hover */}
                        {(isHovered || isConnected) && (
                          <circle
                            cx={node.x} cy={node.y}
                            r={r + 6}
                            fill="none"
                            stroke={c.stroke}
                            strokeWidth={isHovered ? 2 : 1}
                            strokeOpacity={isHovered ? 0.5 : 0.3}
                          />
                        )}

                        {/* Node circle */}
                        <circle
                          cx={node.x} cy={node.y}
                          r={r}
                          fill={c.fill}
                          stroke={c.stroke}
                          strokeWidth={isHovered ? 2 : 1.5}
                          filter={isHovered ? "url(#glow)" : undefined}
                        />

                        {/* Label inside node (for lg nodes) */}
                        {node.size === "lg" && (
                          <text
                            x={node.x} y={node.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="8"
                            fontWeight="700"
                            fontFamily="monospace"
                            fill={c.text}
                            style={{ pointerEvents: "none", userSelect: "none" }}
                          >
                            {lines.map((line, i) => (
                              <tspan
                                key={i}
                                x={node.x}
                                dy={i === 0 ? (lines.length > 1 ? "-4" : "0") : "10"}
                              >
                                {line}
                              </tspan>
                            ))}
                          </text>
                        )}

                        {/* Label below node (for md/sm nodes) */}
                        {(node.size === "md" || node.size === "sm") && (
                          <>
                            <text
                              x={node.x} y={node.y}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize={node.size === "md" ? "7" : "6"}
                              fontWeight="700"
                              fontFamily="monospace"
                              fill={c.text}
                              style={{ pointerEvents: "none", userSelect: "none" }}
                            >
                              {node.label.length > 8 ? node.label.substring(0, 8) : node.label}
                            </text>
                          </>
                        )}

                        {/* External label for md/sm */}
                        {(node.size !== "lg") && (
                          <text
                            x={node.x}
                            y={node.y + r + 10}
                            textAnchor="middle"
                            fontSize="7.5"
                            fontFamily="system-ui, sans-serif"
                            fill={isHovered ? "#e2e8f0" : "#94a3b8"}
                            style={{ pointerEvents: "none", userSelect: "none" }}
                          >
                            {lines[0]}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
              <Info className="w-3.5 h-3.5 text-amber-400/70 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                <span className="text-amber-400/80">Visualización simplificada.</span> Los datos son ficticios (demo). En producción, la red incluirá todos los casos documentados, con algoritmo de fuerza dirigida, agrupamiento dinámico y exportación a formatos estándar (GraphML, Gephi).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
