"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconUser, IconMail, IconLock, IconHanger, IconArrowRight, IconArrowLeft, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuth } from "@/hooks/useAuth";

const STYLE_OPTIONS = [
  { id: "cottagecore", label: "Cottagecore",  desc: "Floral, romantico, campestre",   color: "#f9a8d4" },
  { id: "minimal",     label: "Minimal",      desc: "Neutros, lineas limpias",          color: "#a4b4dc" },
  { id: "boho",        label: "Boho Free",    desc: "Fluido, layering, libre",          color: "#c4b5fd" },
  { id: "artesanal",   label: "Artesanal MX", desc: "Bordado, textiles, color",         color: "#9dc49d" },
  { id: "dark",        label: "Dark Academia",desc: "Oscuro, intelectual, capas",       color: "#94a3b8" },
  { id: "y2k",         label: "Y2K Revival",  desc: "2000s, metalicos, crop tops",      color: "#fca5a5" },
  { id: "streetwear",  label: "Streetwear",   desc: "Urban, sneakers, oversized",       color: "#fbbf24" },
  { id: "vintage",     label: "Vintage Glam", desc: "Retro elegante, 60s-80s",         color: "#e879f9" },
];

export default function RegistroPage() {
  const router = useRouter();
  const { registro } = useAuth();
  const [step, setStep]           = useState(1);
  const [nombre, setNombre]       = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [selected, setSelected]   = useState<string[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev);

  const goStep2 = () => {
    if (!nombre.trim()) { setError("Escribe tu nombre."); return; }
    if (!email.includes("@")) { setError("Correo invalido."); return; }
    if (password.length < 8) { setError("La contrasena debe tener al menos 8 caracteres."); return; }
    setError(""); setStep(2);
  };

  const handleSubmit = async () => {
    if (selected.length === 0) { setError("Elige al menos un estilo."); return; }
    setLoading(true); setError("");
    try {
      await registro(email, password, nombre, selected);
      router.replace("/perfil/medidas");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") setError("Este correo ya esta registrado.");
      else setError("Error al crear la cuenta. Intenta de nuevo.");
    } finally { setLoading(false); }
  };

  const inputBase: React.CSSProperties = {
    background: "var(--input)", border: "1.5px solid var(--border)",
    color: "var(--foreground)", outline: "none", borderRadius: 12,
    padding: "12px 14px 12px 40px", width: "100%", fontSize: "0.875rem",
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--background)", padding: 24 }}>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        {step > 1 && (
          <button onClick={() => setStep(1)} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--muted)" }}>
            <IconArrowLeft size={18} style={{ color: "var(--foreground)" }} />
          </button>
        )}
        <div style={{ flex: 1, height: 4, background: "var(--muted)", borderRadius: 99 }}>
          <div style={{ height: "100%", width: `${(step / 2) * 100}%`, background: "var(--primary)", borderRadius: 99, transition: "width 0.4s ease" }} />
        </div>
        <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{step} / 2</span>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "var(--error-light)", color: "var(--error)" }}>
          {error}
        </div>
      )}

      {/* ── Step 1: Datos ── */}
      {step === 1 && (
        <>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <IconHanger size={28} color="white" />
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Crea tu cuenta</h2>
          <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>Gratis para siempre, sin tarjeta</p>

          <div className="space-y-4" style={{ maxWidth: 360 }}>
            <div className="relative">
              <IconUser size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                placeholder="Tu nombre" style={inputBase} />
            </div>
            <div className="relative">
              <IconMail size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Correo electronico" style={inputBase} />
            </div>
            <div className="relative">
              <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Contrasena (min 8 caracteres)" style={inputBase} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPass
                  ? <IconEyeOff size={18} style={{ color: "var(--muted-foreground)" }} />
                  : <IconEye    size={18} style={{ color: "var(--muted-foreground)" }} />}
              </button>
            </div>
            <button onClick={goStep2}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-base"
              style={{ background: "var(--primary)", color: "white" }}>
              Siguiente <IconArrowRight size={18} />
            </button>
          </div>

          <p className="text-sm mt-6" style={{ color: "var(--muted-foreground)" }}>
            Ya tienes cuenta?{" "}
            <Link href="/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
              Inicia sesion
            </Link>
          </p>
        </>
      )}

      {/* ── Step 2: Style DNA ── */}
      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Tu Style DNA</h2>
          <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>
            Elige hasta 3 estilos — tu feed se personaliza con esto.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {STYLE_OPTIONS.map(({ id, label, desc, color }) => {
              const sel = selected.includes(id);
              return (
                <button key={id} onClick={() => toggle(id)}
                  className="flex items-start gap-3 p-3 rounded-2xl text-left transition-all"
                  style={{
                    background: sel ? color + "33" : "var(--card)",
                    border: `2px solid ${sel ? color : "var(--border)"}`,
                  }}>
                  <div className="w-8 h-8 rounded-xl flex-shrink-0 mt-0.5"
                    style={{ background: color + "55" }} />
                  <div>
                    <div className="text-xs font-bold" style={{ color: "var(--foreground)" }}>{label}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs mb-4 text-center" style={{ color: "var(--muted-foreground)" }}>
            {selected.length}/3 seleccionados
          </p>

          <button onClick={handleSubmit} disabled={selected.length === 0 || loading}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-base"
            style={{
              background: selected.length > 0 ? "var(--primary)" : "var(--muted)",
              color: selected.length > 0 ? "white" : "var(--muted-foreground)",
            }}>
            {loading ? "Creando cuenta..." : <>Crear mi cuenta <IconArrowRight size={18} /></>}
          </button>
        </>
      )}
    </div>
  );
}
