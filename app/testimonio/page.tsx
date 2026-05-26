"use client";

import { useState } from "react";
import { FileText, Shield, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";

type FormState = "idle" | "submitting" | "success";

const initialForm = {
  nombre: "",
  perfil: "",
  pais: "Venezuela",
  estado: "",
  ciudad: "",
  fechaAprox: "",
  tipoHecho: "",
  relato: "",
  privacidad: "",
  consentimiento: false,
};

const perfiles = [
  { value: "victim", label: "Víctima directa" },
  { value: "family", label: "Familiar" },
  { value: "ex_political_prisoner", label: "Ex preso/a político/a" },
  { value: "defender", label: "Defensor/a de DDHH" },
  { value: "witness", label: "Testigo" },
  { value: "researcher", label: "Investigador/a" },
];

const tiposHecho = [
  { value: "detencion_arbitraria", label: "Detención arbitraria" },
  { value: "tortura", label: "Tortura" },
  { value: "desaparicion_forzada", label: "Desaparición forzada" },
  { value: "ejecucion_extrajudicial", label: "Ejecución extrajudicial" },
  { value: "persecucion_politica", label: "Persecución política" },
  { value: "exilio", label: "Exilio forzado" },
  { value: "censura", label: "Censura" },
  { value: "otro", label: "Otro" },
];

const estadosVenezuela = [
  "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar",
  "Carabobo", "Cojedes", "Delta Amacuro", "Dependencias Federales",
  "Distrito Capital", "Falcón", "Guárico", "La Guaira", "Lara",
  "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa",
  "Sucre", "Táchira", "Trujillo", "Yaracuy", "Zulia",
];

export default function TestimonioPage() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    await new Promise((r) => setTimeout(r, 1800));
    setState("success");
  };

  if (state === "success") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">Testimonio recibido</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Tu testimonio ha sido registrado de forma segura en el sistema. Un equipo de analistas lo revisará y te contactará si es necesario. Gracias por tu valentía.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left mb-6">
            <div className="text-xs text-slate-500 mb-2 font-mono">Referencia de registro</div>
            <div className="text-sm font-mono text-blue-400">
              TES-{Date.now().toString(36).toUpperCase().slice(-8)}
            </div>
          </div>
          <p className="text-xs text-slate-600 font-mono mb-4">
            Nivel de privacidad: {form.privacidad || "No especificado"}
          </p>
          <button
            onClick={() => { setForm(initialForm); setState("idle"); }}
            className="text-sm text-blue-400 hover:text-blue-300 underline"
          >
            Registrar otro testimonio
          </button>
        </div>
      </div>
    );
  }

  const inputCls = "w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all";
  const labelCls = "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            Sistema Nacional · Registro de testimonio
          </div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight mb-3">
            Enviar tu testimonio
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Tu relato es parte de la memoria colectiva venezolana. Puedes enviarlo de forma anónima o con tu identidad. Todos los datos son tratados con estricta confidencialidad.
          </p>

          {/* Privacy notice */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl">
            <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-blue-300 font-medium mb-1">Aviso de seguridad</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Esta es una demo visual. En la versión de producción, los datos serán cifrados extremo a extremo. Nunca compartiremos tu información sin consentimiento explícito.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Identity */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">1</div>
              <h2 className="text-sm font-semibold text-slate-200">Identidad y perfil</h2>
            </div>

            <div>
              <label className={labelCls}>Nombre o seudónimo <span className="text-slate-600 normal-case font-normal">(puedes usar un alias)</span></label>
              <input
                type="text"
                placeholder="Tu nombre real o un seudónimo"
                value={form.nombre}
                onChange={set("nombre")}
                className={inputCls}
                required
              />
            </div>

            <div>
              <label className={labelCls}>Tu perfil</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {perfiles.map((p) => (
                  <label
                    key={p.value}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                      form.perfil === p.value
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="perfil"
                      value={p.value}
                      checked={form.perfil === p.value}
                      onChange={set("perfil")}
                      className="sr-only"
                      required
                    />
                    <span className="w-3 h-3 rounded-full border flex items-center justify-center shrink-0"
                      style={{ borderColor: form.perfil === p.value ? "#60a5fa" : "#475569" }}>
                      {form.perfil === p.value && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 block" />}
                    </span>
                    {p.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">2</div>
              <h2 className="text-sm font-semibold text-slate-200">Ubicación del hecho</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>País</label>
                <input
                  type="text"
                  value={form.pais}
                  onChange={set("pais")}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Estado / Región</label>
                <select value={form.estado} onChange={set("estado")} className={inputCls} required>
                  <option value="">Seleccionar estado</option>
                  {estadosVenezuela.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Ciudad / Municipio</label>
                <input
                  type="text"
                  placeholder="Ciudad o municipio"
                  value={form.ciudad}
                  onChange={set("ciudad")}
                  className={inputCls}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Event */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">3</div>
              <h2 className="text-sm font-semibold text-slate-200">Descripción del hecho</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Fecha aproximada del hecho</label>
                <input
                  type="date"
                  value={form.fechaAprox}
                  onChange={set("fechaAprox")}
                  className={inputCls}
                  min="2000-01-01"
                  max="2025-12-31"
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Tipo de hecho</label>
                <select value={form.tipoHecho} onChange={set("tipoHecho")} className={inputCls} required>
                  <option value="">Seleccionar tipo</option>
                  {tiposHecho.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>
                Tu relato <span className="text-slate-600 normal-case font-normal">(describe lo que viviste o presenciaste)</span>
              </label>
              <textarea
                rows={8}
                placeholder="Cuéntanos lo que ocurrió con el mayor detalle posible. Incluye fechas, lugares, personas involucradas, lo que escuchaste o viste. No existe un relato demasiado pequeño ni demasiado grande."
                value={form.relato}
                onChange={set("relato")}
                className={`${inputCls} resize-none`}
                required
                minLength={100}
              />
              <div className="flex justify-end mt-1">
                <span className="text-[10px] font-mono text-slate-600">
                  {form.relato.length} caracteres{form.relato.length < 100 ? ` · mínimo 100` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Privacy */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">4</div>
              <h2 className="text-sm font-semibold text-slate-200">Privacidad y consentimiento</h2>
            </div>

            <div>
              <label className={labelCls}>Nivel de privacidad de tu testimonio</label>
              <div className="space-y-2">
                {[
                  {
                    value: "public",
                    label: "Público",
                    desc: "Tu testimonio puede ser visto por cualquier persona que acceda a la plataforma.",
                    badge: "bg-blue-500/10 border-blue-500/20 text-blue-300",
                  },
                  {
                    value: "anonymized",
                    label: "Anonimizado",
                    desc: "Tu testimonio es visible, pero tu identidad queda protegida. Se eliminan datos identificativos.",
                    badge: "bg-violet-500/10 border-violet-500/20 text-violet-300",
                  },
                  {
                    value: "private",
                    label: "Privado",
                    desc: "Solo investigadores y analistas verificados pueden acceder. Nunca será publicado sin tu consentimiento explícito.",
                    badge: "bg-slate-700/50 border-slate-600 text-slate-300",
                  },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      form.privacidad === opt.value
                        ? "border-blue-500/40 bg-blue-500/5"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="privacidad"
                      value={opt.value}
                      checked={form.privacidad === opt.value}
                      onChange={set("privacidad")}
                      className="sr-only"
                      required
                    />
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                      style={{ borderColor: form.privacidad === opt.value ? "#60a5fa" : "#475569" }}>
                      {form.privacidad === opt.value && <span className="w-2 h-2 rounded-full bg-blue-400 block" />}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-slate-200">{opt.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${opt.badge}`}>
                          {opt.value}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Consent */}
            <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/30">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consentimiento}
                  onChange={(e) => setForm((f) => ({ ...f, consentimiento: e.target.checked }))}
                  className="w-4 h-4 mt-0.5 rounded border-slate-600 bg-slate-800 accent-blue-500 cursor-pointer shrink-0"
                  required
                />
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-2">
                    <span className="font-medium">Consentimiento informado:</span> Comprendo que este testimonio será almacenado de forma segura en el Sistema Nacional de Memoria Democrática. Entiendo que puede ser utilizado para documentación de derechos humanos, investigación académica y procesos legales, bajo el nivel de privacidad que he seleccionado.
                  </p>
                  <p className="text-xs text-slate-500">
                    Puedo solicitar la eliminación o modificación de mi testimonio en cualquier momento.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-amber-400 font-medium">Datos ficticios:</span> Esta es una demo visual. En la versión productiva, el testimonio se cifrará y almacenará en un servidor seguro. No envíes información real en esta demo.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={state === "submitting" || !form.consentimiento}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-base transition-all shadow-lg shadow-blue-900/30"
          >
            {state === "submitting" ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando testimonio…
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Enviar testimonio
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
