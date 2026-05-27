"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/testimonio", label: "Testimonio" },
  { href: "/timeline", label: "Cronología" },
  { href: "/relaciones", label: "Red de Vínculos" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-inst-blue shadow-md">
      {/* Gold top stripe */}
      <div className="h-0.5 bg-gold w-full" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 rounded-sm border border-gold/40 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <Archive className="w-4 h-4 text-gold" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white leading-tight tracking-tight">
              Memoria Democrática
            </div>
            <div className="text-[9px] text-gold/70 uppercase tracking-[0.15em] leading-tight font-medium">
              Sistema Nacional · Demo
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-white"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {link.label}
                {/* Gold underline for active */}
                {active && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono text-gold/80 border border-gold/30 px-2 py-0.5 rounded-sm tracking-wider">
            DEMO v0.1
          </span>
          <Link
            href="/testimonio"
            className="px-4 py-1.5 rounded-sm bg-gold hover:bg-gold-light text-inst-blue text-sm font-semibold tracking-wide transition-colors"
          >
            Enviar testimonio
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-inst-blue px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium border-l-2 transition-colors ${
                  active
                    ? "border-gold text-white bg-white/5"
                    : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-1 border-t border-white/10">
            <Link
              href="/testimonio"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-sm bg-gold hover:bg-gold-light text-inst-blue text-sm font-semibold transition-colors"
            >
              Enviar testimonio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
