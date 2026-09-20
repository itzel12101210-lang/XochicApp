"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconLock, IconBrandGoogle, IconHanger } from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: conectar Firebase Auth
    // const { signInWithEmailAndPassword } = await import("firebase/auth");
    // const { auth } = await import("@/lib/firebase");
    // await signInWithEmailAndPassword(auth, email, password);
    router.push("/");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--background)" }}>
      {/* Logo */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
        <IconHanger size={32} color="white" />
      </div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Bienvenida de vuelta</h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>Inicia sesion en tu cuenta Xochic</p>

      <form onSubmit={handleLogin} className="w-full space-y-4" style={{ maxWidth: 360 }}>
        {/* Email */}
        <div className="relative">
          <IconMail size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Correo electronico" required
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
            style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }}
          />
        </div>
        {/* Password */}
        <div className="relative">
          <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Contrasena" required
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
            style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }}
          />
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full py-3.5 rounded-2xl font-semibold text-base"
          style={{ background: "var(--primary)", color: "white", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Entrando..." : "Iniciar sesion"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5 w-full" style={{ maxWidth: 360 }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>o continua con</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {/* Google */}
      <button
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-sm"
        style={{ maxWidth: 360, background: "var(--card)", border: "1.5px solid var(--border)", color: "var(--foreground)" }}>
        <IconBrandGoogle size={20} style={{ color: "#4285F4" }} />
        Continuar con Google
      </button>

      <p className="text-sm mt-8" style={{ color: "var(--muted-foreground)" }}>
        No tienes cuenta?{" "}
        <Link href="/registro" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
          Registrate gratis
        </Link>
      </p>
    </div>
  );
}
