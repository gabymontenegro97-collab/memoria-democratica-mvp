import Link from "next/link";
import { Archive } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-inst-blue mt-auto">
      {/* Gold top rule */}
      <div className="h-px bg-gold/40 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-sm border border-gold/40 bg-gold/10 flex items-center justify-center">
                <Archive className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white leading-tight">Memoria Democrática</div>
                <div className="text-[9px] text-gold/60 uppercase tracking-[0.15em]">Sistema Nacional</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Infraestructura digital para preservar la memoria histórica venezolana. Trazable, verificable y accesible para víctimas, defensores e investigadores.
            </p>
            <div className="mt-5 w-10 h-px bg-gold/30" />
            <p className="text-[10px] text-white/30 font-mono mt-3 tracking-wider">
              Versión Demo 0.1
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-gold/70 mb-5 font-semibold">
              Plataforma
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/dashboard", label: "Dashboard analítico" },
                { href: "/testimonio", label: "Enviar testimonio" },
                { href: "/timeline", label: "Cronología 2014–2024" },
                { href: "/relaciones", label: "Red de vínculos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-gold/70 mb-5 font-semibold">
              Estado del sistema
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-sm text-white/60">Demo activa</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                <span className="text-sm text-white/40">Backend: no conectado</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-sm text-white/40">IA: simulada</span>
              </div>
            </div>
            <p className="text-[10px] text-white/25 mt-6 leading-relaxed">
              Los datos mostrados son ficticios. Esta es una demo visual para presentación a inversores y aliados estratégicos.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            © 2025 Sistema Nacional de Memoria Democrática
          </p>
          <p className="text-[10px] text-white/20 font-mono tracking-wider">
            TODOS LOS DATOS SON FICTICIOS · SOLO DEMO
          </p>
        </div>
      </div>
    </footer>
  );
}
