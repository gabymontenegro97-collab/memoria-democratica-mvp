import Link from "next/link";
import { Archive } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-blue-600/15 border border-blue-500/25 flex items-center justify-center">
                <Archive className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                Memoria Democrática
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Infraestructura digital para preservar la memoria histórica
              venezolana. Trazable, verificable y accesible para víctimas,
              defensores e investigadores.
            </p>
            <p className="text-xs text-slate-600 mt-4 font-mono">
              Sistema Nacional · Versión Demo 0.1
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-semibold">
              Plataforma
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/dashboard", label: "Dashboard analítico" },
                { href: "/testimonio", label: "Enviar testimonio" },
                { href: "/timeline", label: "Cronología 2014–2024" },
                { href: "/relaciones", label: "Red de vínculos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-semibold">
              Estado del sistema
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-xs text-slate-400">Demo activa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                <span className="text-xs text-slate-500">
                  Backend: no conectado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400/50" />
                <span className="text-xs text-slate-500">IA: simulada</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 mt-5 leading-relaxed">
              Los datos mostrados son ficticios. Esta es una demo visual para
              presentación a inversores y aliados estratégicos.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">
            © 2025 Sistema Nacional de Memoria Democrática
          </p>
          <p className="text-xs text-slate-700 font-mono">
            Todos los datos son ficticios · Solo demo
          </p>
        </div>
      </div>
    </footer>
  );
}
