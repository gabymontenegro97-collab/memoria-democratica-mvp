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
      <div className="min-h-screen bg-archive flex items-center justify-center px-4 paper-texture">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-inst-blue mb-3">Testimonio recibido</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Tu testimonio ha sido registrado de forma segura en el sistema. Un equipo de analistas lo revisará y te contactará si es necesario. Gracias por tu valentía.
          </p>
          <div className="bg-white border border-doc-gray rounded-sm p-5 text-left mb-6 shadow-sm">
            <div className="text-[10px] text-gray-400 mb-2 font-mono uppercase tracking-widest">Referencia de registro</div>
            <div className="text-sm font-mono text-inst-blue font-semibold">
              TES-{Date.now().toString(36).toUpperCase().slice(-8)}
            </div>
            <div className="mt-3 pt-3 border-t border-doc-gray">
              <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1">Nivel de privacidad</div>
              <div className="text-xs text-gray-600 font-medium">{form.privacidad || "No especificado"}</div>
            </div>
          </div>
          <button
            onClick={() => { setForm(initialForm); setState("idle"); }}
            className="text-sm text-inst-blue hover:text-rep-blue underline font-medium transition-colors"
          >
            Registrar otro testimonio
          </button>
        </div>
      </div>
    );
  }

  const inputCls = "w-full bg-white border border-doc-gray rounded-sm px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-inst-blue/50 focus:ring-1 focus:ring-inst-blue/20 transition-all";
  const labelCls = "block text-[10px] font-semibold text-gray-500 uppercase tracking-[0.12em] mb-2";

  return (
    <div className="min-h-screen bg-archive paper-texture">
      {/* Page header */}
      <div className="bg-inst-blue">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-px h-5 bg-gold" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
              Sistema Nacional · Registro de Testimonio
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
            Enviar tu testimonio
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl">
            Tu relato es parte de la memoria colectiva venezolana. Puedes enviarlo de forma anónima o con tu identidad. Todos los datos son tratados con estricta confidencialidad.
          </p>

          {/* Privacy notice */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-sm">
            <Shield className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gold font-medium mb-1">Aviso de seguridad</p>
              <p className="text-xs text-white/50 leading-relaxed">
                Esta es una demo visual. En la versión de producción, los datos serán cifrados extremo a extremo. Nunca compartiremos tu información sin consentimiento explícito.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section 1: Identity */}
          <div className="bg-white border border-doc-gray rounded-sm shadow-sm">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-doc-gray">
              <div className="w-6 h-6 rounded-sm bg-inst-blue flex items-center justify-center text-white text-xs font-bold shrink-0">1</div>
              <h2 className="text-sm font-semibold text-inst-blue">Identidad y perfil</h2>
            </div>
            <div className="p-7 space-y-5">
              <div>
                <label className={labelCls}>
                  Nombre o seudónimo{" "}
                  <span className="text-gray-400 normal-case font-normal tracking-normal">(puedes usar un alias)</span>
                </label>
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
                      className={`flex items-center gap-2.5 p-3 rounded-sm border cursor-pointer transition-all text-sm ${
                        form.perfil === p.value
                          ? "border-gold bg-gold/5 text-inst-blue"
                          : "border-doc-gray bg-white text-gray-500 hover:border-inst-blue/30"
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
                      <span
                        className="w-3 h-3 rounded-full border flex items-center justify-center shrink-0"
                        style={{ borderColor: form.perfil === p.value ? "#C8A44D" : "#D1D5DB" }}
                      >
                        {form.perfil === p.value && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold block" />
                        )}
                      </span>
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="bg-white border border-doc-gray rounded-sm shadow-sm">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-doc-gray">
              <div className="w-6 h-6 rounded-sm bg-inst-blue flex items-center justify-center text-white text-xs font-bold shrink-0">2</div>
              <h2 className="text-sm font-semibold text-inst-blue">Ubicación del hecho</h2>
            </div>
            <div className="p-7">
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
          </div>

          {/* Section 3: Event */}
          <div className="bg-white border border-doc-gray rounded-sm shadow-sm">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-doc-gray">
              <div className="w-6 h-6 rounded-sm bg-inst-blue flex items-center justify-center text-white text-xs font-bold shrink-0">3</div>
              <h2 className="text-sm font-semibold text-inst-blue">Descripción del hecho</h2>
            </div>
            <div className="p-7 space-y-5">
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
                  Tu relato{" "}
                  <span className="text-gray-400 normal-case font-normal tracking-normal">
                    (describe lo que viviste o presenciaste)
                  </span>
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
                <div className="flex justify-end mt-1.5">
                  <span className="text-[10px] font-mono text-gray-400">
                    {form.relato.length} caracteres{form.relato.length < 100 ? ` · mínimo 100` : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Privacy */}
          <div className="bg-white border border-doc-gray rounded-sm shadow-sm">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-doc-gray">
              <div className="w-6 h-6 rounded-sm bg-inst-blue flex items-center justify-center text-white text-xs font-bold shrink-0">4</div>
              <h2 className="text-sm font-semibold text-inst-blue">Privacidad y consentimiento</h2>
            </div>
            <div className="p-7 space-y-5">
              <div>
                <label className={labelCls}>Nivel de privacidad de tu testimonio</label>
                <div className="space-y-2">
                  {[
                    {
                      value: "public",
                      label: "Público",
                      desc: "Tu testimonio puede ser visto por cualquier persona que acceda a la plataforma.",
                      badge: "bg-inst-blue/5 border-inst-blue/20 text-inst-blue",
                    },
                    {
                      value: "anonymized",
                      label: "Anonimizado",
                      desc: "Tu testimonio es visible, pero tu identidad queda protegida. Se eliminan datos identificativos.",
                      badge: "bg-gold/5 border-gold/30 text-gold",
                    },
                    {
                      value: "private",
                      label: "Privado",
                      desc: "Solo investigadores y analistas verificados pueden acceder. Nunca será publicado sin tu consentimiento explícito.",
                      badge: "bg-gray-100 border-gray-200 text-gray-500",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all ${
                        form.privacidad === opt.value
                          ? "border-gold bg-gold/5"
                          : "border-doc-gray hover:border-inst-blue/20 bg-white"
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
                      <span
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                        style={{ borderColor: form.privacidad === opt.value ? "#C8A44D" : "#D1D5DB" }}
                      >
                        {form.privacidad === opt.value && (
                          <span className="w-2 h-2 rounded-full bg-gold block" />
                        )}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-inst-blue">{opt.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border font-mono ${opt.badge}`}>
                            {opt.value}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <div className="border border-doc-gray rounded-sm p-4 bg-archive">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consentimiento}
                    onChange={(e) => setForm((f) => ({ ...f, consentimiento: e.target.checked }))}
                    className="w-4 h-4 mt-0.5 rounded-sm border-doc-gray accent-gold cursor-pointer shrink-0"
                    required
                  />
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      <span className="font-semibold text-inst-blue">Consentimiento informado:</span>{" "}
                      Comprendo que este testimonio será almacenado de forma segura en el Sistema Nacional de Memoria Democrática. Entiendo que puede ser utilizado para documentación de derechos humanos, investigación académica y procesos legales, bajo el nivel de privacidad que he seleccionado.
                    </p>
                    <p className="text-xs text-gray-400">
                      Puedo solicitar la eliminación o modificación de mi testimonio en cualquier momento.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="text-amber-600 font-medium">Datos ficticios:</span>{" "}
              Esta es una demo visual. En la versión productiva, el testimonio se cifrará y almacenará en un servidor seguro. No envíes información real en esta demo.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={state === "submitting" || !form.consentimiento}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-inst-blue hover:bg-rep-blue disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-sm font-semibold text-sm tracking-wide transition-all shadow-lg shadow-inst-blue/20"
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
