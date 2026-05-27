"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  gold: boolean;
  opacity: number;
}

const CONNECTION_DIST = 130;
const BASE_SPEED = 0.22;

export default function MemoryNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    function buildParticles(w: number, h: number) {
      const density = (w * h) / 11000;
      const count = Math.min(Math.max(Math.floor(density), 30), 75);
      return Array.from<Particle>({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * BASE_SPEED,
        vy: (Math.random() - 0.5) * BASE_SPEED,
        r: Math.random() > 0.72 ? 2.8 : 1.6,
        gold: Math.random() > 0.8,
        opacity: 0.12 + Math.random() * 0.1,
      }));
    }

    function resize() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      canvas!.width = w;
      canvas!.height = h;
      particles = buildParticles(w, h);
    }

    function tick() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECTION_DIST * CONNECTION_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / CONNECTION_DIST) * 0.09;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(11,30,109,${alpha.toFixed(3)})`;
            ctx!.lineWidth = 0.7;
            ctx!.stroke();
          }
        }
      }

      // Nodes
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.gold
          ? `rgba(200,164,77,${p.opacity + 0.15})`
          : `rgba(11,30,109,${p.opacity})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
