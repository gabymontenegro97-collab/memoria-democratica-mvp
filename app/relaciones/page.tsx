"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { networkNodes, networkEdges, type NodeType, type NetworkNode } from "@/lib/mock-data";
import { Info, ChevronRight } from "lucide-react";

const nodeColors: Record<NodeType, { fill: string; stroke: string; text: string; legend: string; dot: string }> = {
  actor:       { fill: "#9E1B32", stroke: "#C8232B", text: "#ffffff", legend: "Actores perpetradores", dot: "bg-rep-red"    },
  institution: { fill: "#0B1E6D", stroke: "#1E3A8A", text: "#ffffff", legend: "Instituciones",        dot: "bg-inst-blue"  },
  location:    { fill: "#065F46", stroke: "#059669", text: "#ffffff", legend: "Territorios",          dot: "bg-emerald-700"},
  event:       { fill: "#92400E", stroke: "#D97706", text: "#ffffff", legend: "Eventos",              dot: "bg-amber-700"  },
  testimony:   { fill: "#4C1D95", stroke: "#7C3AED", text: "#ffffff", legend: "Testimonios",         dot: "bg-violet-800" },
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
    <div className="min-h-screen bg-archive">
      {/* Page header */}
      <div className="bg-inst-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-px h-5 bg-gold" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
              Sistema Nacional · Análisis de Relaciones
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Red de vínculos
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
            Visualización de las relaciones entre actores, instituciones, territorios, eventos y testimonios documentados. Pasa el cursor sobre un nodo para explorar sus conexiones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls + Graph */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Legend / filters */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm p-5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-4">
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
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs transition-all border ${
                        active
                          ? "border-doc-gray bg-archive text-gray-700"
                          : "border-transparent bg-white text-gray-400"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border"
                        style={{
                          backgroundColor: active ? colors.fill : "#F3F4F6",
                          borderColor: active ? colors.stroke : "#D1D5DB",
                        }}
                      />
                      <span className="flex-1 text-left">{colors.legend}</span>
                      <span className="font-mono text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hovered node detail */}
            {hovered ? (
              <div
                className="bg-white border rounded-sm shadow-sm p-5 transition-all"
                style={{ borderColor: nodeColors[hovered.type].stroke + "60" }}
              >
                <div
                  className="text-[10px] uppercase tracking-wider font-semibold mb-2"
                  style={{ color: nodeColors[hovered.type].fill }}
                >
                  {nodeColors[hovered.type].legend}
                </div>
                <h3 className="font-bold text-inst-blue text-sm mb-1">{hovered.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{hovered.description}</p>

                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Conexiones directas</div>
                <div className="space-y-1.5">
                  {networkEdges
                    .filter((e) => e.source === hovered.id || e.target === hovered.id)
                    .slice(0, 6)
                    .map((e, i) => {
                      const otherId = e.source === hovered.id ? e.target : e.source;
                      const other = nodeById(otherId);
                      if (!other) return null;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: nodeColors[other.type].fill }}
                          />
                          <span className="text-[11px] text-gray-600">{other.label}</span>
                        </div>
                      );
                    })}
                </div>

                {hovered.type === "testimony" && (
                  <Link
                    href={`/caso/${hovered.label}`}
                    className="inline-flex items-center gap-1 mt-4 text-[11px] text-inst-blue hover:text-rep-blue transition-colors font-medium"
                  >
                    Ver caso completo
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ) : (
              <div className="bg-white border border-doc-gray rounded-sm shadow-sm p-5 text-center">
                <Info className="w-5 h-5 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">
                  Pasa el cursor sobre un nodo para ver sus detalles y conexiones.
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm p-5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-4">
                Red — resumen
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Nodos visibles</span>
                  <span className="text-inst-blue font-mono font-semibold">{visibleNodes.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Vínculos visibles</span>
                  <span className="text-inst-blue font-mono font-semibold">{visibleEdges.length}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-doc-gray pt-2.5">
                  <span className="text-gray-400">Total nodos</span>
                  <span className="text-gray-500 font-mono">{networkNodes.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Total vínculos</span>
                  <span className="text-gray-500 font-mono">{networkEdges.length}</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-300 mt-4 leading-relaxed">
                Red simplificada · Visualización estática. En producción: fuerza dirigida, filtros avanzados y exportación.
              </p>
            </div>
          </div>

          {/* SVG Graph */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-doc-gray rounded-sm shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-doc-gray flex items-center justify-between bg-archive">
                <span className="text-xs text-gray-500 font-mono">
                  Red de relaciones — {visibleNodes.length} nodos · {visibleEdges.length} vínculos
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  Hover para explorar
                </span>
              </div>

              <div className="relative">
                <svg
                  viewBox="0 0 1160 520"
                  className="w-full h-auto"
                  style={{ background: "#F8F8F6" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(229,231,235,0.8)" strokeWidth="0.5" />
                    </pattern>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
                        stroke={isHighlighted ? "#C8A44D" : "#CBD5E1"}
                        strokeWidth={isHighlighted ? 2 : 1}
                        strokeOpacity={isDimmed ? 0.1 : isHighlighted ? 0.9 : 0.5}
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

                    const lines = node.label.split("\n");

                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setHovered(node)}
                        style={{ transition: "opacity 0.15s" }}
                        opacity={isDimmed ? 0.15 : 1}
                      >
                        {/* Outer ring on hover */}
                        {(isHovered || isConnected) && (
                          <circle
                            cx={node.x} cy={node.y}
                            r={r + 7}
                            fill="none"
                            stroke={isHovered ? "#C8A44D" : c.stroke}
                            strokeWidth={isHovered ? 2 : 1}
                            strokeOpacity={isHovered ? 0.7 : 0.4}
                          />
                        )}

                        {/* Node circle */}
                        <circle
                          cx={node.x} cy={node.y}
                          r={r}
                          fill={c.fill}
                          stroke={isHovered ? "#C8A44D" : c.stroke}
                          strokeWidth={isHovered ? 2.5 : 1.5}
                          filter={isHovered ? "url(#glow)" : undefined}
                        />

                        {/* Label inside node (lg) */}
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

                        {/* Label inside (md/sm) */}
                        {(node.size === "md" || node.size === "sm") && (
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
                        )}

                        {/* External label for md/sm */}
                        {node.size !== "lg" && (
                          <text
                            x={node.x}
                            y={node.y + r + 11}
                            textAnchor="middle"
                            fontSize="7.5"
                            fontFamily="system-ui, sans-serif"
                            fill={isHovered ? "#0B1E6D" : "#6B7280"}
                            fontWeight={isHovered ? "600" : "400"}
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
            <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-sm">
              <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-500 leading-relaxed">
                <span className="text-amber-600 font-medium">Visualización simplificada.</span>{" "}
                Los datos son ficticios (demo). En producción, la red incluirá todos los casos documentados, con algoritmo de fuerza dirigida, agrupamiento dinámico y exportación a formatos estándar (GraphML, Gephi).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
