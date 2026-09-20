"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconUser, IconMail, IconLock, IconHanger, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

const STYLE_OPTIONS = [
  { id: "cottagecore", emoji: "🌸", label: "Cottagecore", desc: "Floral, romantico, campestre" },
  { id: "minimal",     emoji: "🤍", label: "Minimal",     desc: "Neutros, lineas limpias" },
  { id: "boho",        emoji: "🌙", label: "Boho",        desc: "Fluido, layering, libre" },
  { id: "artesanal",   emoji: "🌺", label: "Artesanal MX",desc: "Bordado, textiles, color" },
  { id: "dark",        emoji: "🖤", label: "Dark Academia",desc: "Oscuro, intelectual" },
  { id: "y2k",         emoji: "💫", label: "Y2K Revival",  desc: "2000s, metalicos, crop" },
  { id: "streetwear",  emoji: "🔥", label: "Streetwear",   desc: "Urban, sneakers, oversized" },
  { id: "vintage",     emoji: "👗", label: "Vintage Glam", desc: "Retro elegante, 60s-80s" },
];

export default function RegistroPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: Firebase Auth createUserWithEmailAndPassword
    // Save user profile + styleDNA to Firestore
    router.push("/perfil/medidas");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--background)", padding: 24 }}>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--muted)" }}>
            <IconArrowLeft size={18} style={{ color: "var(--foreground)" }} />
          </button>
        )}
        <div style={{ flex: 1, height: 4, background: "var(--muted)", borderRadius: 99 }}>
          <div style={{ height: "100%", width: `${(step / 2) * 100}%`, background: "var(--primary)", borderRadius: 99, transition: "width 0.4s" }} />
        </div>
        <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{step}/2</span>
      </div>

      {step === 1 && (
        <>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <IconHanger size={28} color="white" />
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Crea tu cuenta</h2>
          <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>Gratis para siempre</p>

          <div className="space-y-4" style={{ maxWidth: 360 }}>
            <div className="relative">
              <IconUser size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none", width: "100%" }} />
            </div>
            <div className="relative">
              <IconMail size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electronico" required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none", width: "100%" }} />
            </div>
            <div className="relative">
              <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contrasena (min 8 caracteres)" required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none", width: "100%" }} />
            </div>
            <button onClick={() => nombre && email && password.length >= 8 && setStep(2)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-base"
              style={{ background: "var(--primary)", color: "white" }}>
              Siguiente <IconArrowRight size={18} />
            </button>
          </div>
          <p className="text-sm mt-6" style={{ color: "var(--muted-foreground)" }}>
            Ya tienes cuenta?{" "}
            <Link href="/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>Inicia sesion</Link>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Tu Style DNA</h2>
          <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>
            Elige hasta 3 estilos. Tu feed se personaliza con esto.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {STYLE_OPTIONS.map(({ id, emoji, label, desc }) => {
              const sel = selectedStyles.includes(id);
              return (
                <button key={id} onClick={() => toggleStyle(id)}
                  className="flex items-center gap-3 p-3 rounded-2xl text-left transition-all"
                  style={{
                    background: sel ? "var(--primary)" : "var(--card)",
                    border: `2px solid ${sel ? "var(--primary)" : "var(--border)"}`,
                    color: sel ? "white" : "var(--foreground)",
                  }}>
                  <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
                  <div>
                    <div className="text-xs font-bold">{label}</div>
                    <div className="text-xs opacity-70">{desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <button onClick={handleSubmit} disabled={selectedStyles.length === 0 || loading}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-base"
            style={{ background: selectedStyles.length > 0 ? "var(--primary)" : "var(--muted)", color: "white" }}>
            {loading ? "Creando cuenta..." : "Crear mi cuenta"} <IconArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
