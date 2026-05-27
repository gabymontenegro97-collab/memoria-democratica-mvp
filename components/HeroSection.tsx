"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Archive,
  FileText,
  Clock,
  Network,
  Search,
  Shield,
  BookOpen,
  Link2,
  ChevronRight,
} from "lucide-react";
import MemoryNetworkBackground from "./MemoryNetworkBackground";

/* ── Typewriter ─────────────────────────────────────────────────────────── */

const PHRASES = [
  "Analizando 4,847 testimonios y patrones documentados…",
  "Identificando conexiones entre actores e instituciones…",
  "Construyendo la cronología Venezuela 2014–2024…",
  "Preservando evidencias para la justicia transicional…",
  "Procesando red de vínculos y registros audiovisuales…",
];

function useTypewriter(phrases: string[]) {
  const [display, setDisplay] = useState("");
  const state = useRef({
    phraseIdx: 0,
    charIdx: 0,
    deleting: false,
    paused: false,
  });

  useEffect(() => {
    const s = state.current;

    function schedule() {
      const phrase = phrases[s.phraseIdx];

      if (s.paused) {
        return setTimeout(() => {
          s.paused = false;
          s.deleting = true;
          handle();
        }, 2600);
      }

      if (!s.deleting) {
        if (s.charIdx < phrase.length) {
          return setTimeout(() => {
            s.charIdx++;
            setDisplay(phrase.slice(0, s.charIdx));
            handle();
          }, 52);
        } else {
          s.paused = true;
          handle();
        }
      } else {
        if (s.charIdx > 0) {
          return setTimeout(() => {
            s.charIdx--;
            setDisplay(phrase.slice(0, s.charIdx));
            handle();
          }, 26);
        } else {
          s.deleting = false;
          s.phraseIdx = (s.phraseIdx + 1) % phrases.length;
          handle();
        }
      }
      return undefined;
    }

    let timer: ReturnType<typeof setTimeout>;
    function handle() {
      timer = schedule() ?? setTimeout(handle, 0);
    }
    handle();

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return display;
}

/* ── Floating icons ─────────────────────────────────────────────────────── */

const FLOATING = [
  { Icon: Archive,  pos: { top: "11%", left:  "2.5%" }, dur: "7.2s",  delay: "0s",    size: 22 },
  { Icon: Clock,    pos: { top: "9%",  right: "3%" },   dur: "9.5s",  delay: "1.4s",  size: 20 },
  { Icon: FileText, pos: { top: "54%", left:  "2%" },   dur: "11s",   delay: "0.7s",  size: 18 },
  { Icon: Network,  pos: { top: "46%", right: "2.5%" }, dur: "8.3s",  delay: "2.1s",  size: 22 },
  { Icon: Shield,   pos: { top: "79%", left:  "5%" },   dur: "10s",   delay: "0.3s",  size: 17 },
  { Icon: Search,   pos: { top: "73%", right: "4%" },   dur: "7.8s",  delay: "1.2s",  size: 19 },
  { Icon: BookOpen, pos: { top: "22%", right: "13%" },  dur: "12s",   delay: "2.7s",  size: 15 },
  { Icon: Link2,    pos: { top: "84%", left:  "22%" },  dur: "9.1s",  delay: "0.5s",  size: 14 },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export default function HeroSection() {
  const typewriterText = useTypewriter(PHRASES);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Brief delay so CSS animations start after paint
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-archive min-h-screen flex items-center">
      {/* Animated network */}
      <MemoryNetworkBackground />

      {/* Floating icons — only on large screens */}
      {FLOATING.map(({ Icon, pos, dur, delay, size }, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute hidden lg:block pointer-events-none text-inst-blue"
          style={{
            ...pos,
            opacity: 0.09,
            animation: `float-icon ${dur} ease-in-out ${delay} infinite`,
          }}
        >
          <Icon size={size} strokeWidth={1.5} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pt-36 lg:pb-28">

        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-10"
          style={ready ? { animation: "fade-up 0.7s ease-out 0.05s both" } : { opacity: 0 }}
        >
          <div className="w-px h-5 bg-gold" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
            Sistema Nacional de Memoria Democrática · Venezuela
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-inst-blue leading-[1.05] tracking-tight mb-8 max-w-4xl">
          <span
            className="block"
            style={ready ? { animation: "fade-up 0.8s ease-out 0.18s both" } : { opacity: 0 }}
          >
            La memoria
          </span>
          <span
            className="block text-inst-blue/55 font-light italic"
            style={ready ? { animation: "fade-up 0.8s ease-out 0.42s both" } : { opacity: 0 }}
          >
            está viva.
          </span>
        </h1>

        {/* Gold rule */}
        <div
          className="w-20 h-0.5 bg-gold mb-8"
          style={ready ? { animation: "fade-up 0.6s ease-out 0.58s both" } : { opacity: 0 }}
        />

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl"
          style={ready ? { animation: "fade-up 0.7s ease-out 0.68s both" } : { opacity: 0 }}
        >
          Una infraestructura digital para preservar, conectar y democratizar la memoria
          histórica de Venezuela — para que el relato del pasado no sea monopolizado por el poder.
        </p>

        {/* AI typewriter prompt */}
        <div
          className="mb-12"
          style={ready ? { animation: "fade-up 0.7s ease-out 0.82s both" } : { opacity: 0 }}
        >
          <div className="ai-prompt-box inline-flex items-start gap-2.5 px-4 py-3 rounded-sm">
            <span className="text-gold font-mono text-sm mt-px select-none leading-none">›</span>
            <div className="font-mono text-sm text-inst-blue/65 min-h-[1.3rem] leading-relaxed">
              {typewriterText || " "}
              <span
                aria-hidden="true"
                className="inline-block w-[2px] h-[1em] bg-gold align-middle ml-0.5 translate-y-[-1px]"
                style={{ animation: "cursor-blink 1s step-end infinite" }}
              />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-start gap-4"
          style={ready ? { animation: "fade-up 0.7s ease-out 0.96s both" } : { opacity: 0 }}
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-inst-blue hover:bg-rep-blue text-white font-semibold text-sm tracking-wide rounded-sm shadow-lg shadow-inst-blue/25 transition-all"
          >
            Explorar la demo
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/testimonio"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-inst-blue/25 hover:border-gold text-inst-blue font-semibold text-sm tracking-wide rounded-sm transition-all hover:bg-gold/5"
          >
            <FileText className="w-4 h-4" />
            Enviar testimonio
          </Link>
        </div>

        {/* Scroll cue */}
        <div
          className="flex items-center gap-3 mt-16"
          style={ready ? { animation: "fade-up 0.6s ease-out 1.15s both" } : { opacity: 0 }}
        >
          <div className="w-px h-8 bg-gold/35" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-medium">
            Explorar
          </span>
        </div>
      </div>
    </section>
  );
}
