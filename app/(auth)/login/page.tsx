"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconLock, IconBrandGoogle, IconHanger, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { loginEmail, loginGoogle } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginEmail(email, password);
      router.replace("/");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") setError("Correo o contrasena incorrectos.");
      else if (err.code === "auth/user-not-found")  setError("No existe una cuenta con ese correo.");
      else setError("Error al iniciar sesion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginGoogle();
      router.replace("/");
    } catch {
      setError("Error al iniciar sesion con Google.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--input)", border: "1.5px solid var(--border)",
    color: "var(--foreground)", outline: "none", borderRadius: 12,
    padding: "12px 14px 12px 40px", width: "100%", fontSize: "0.875rem",
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--background)" }}>

      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
        <IconHanger size={32} color="white" />
      </div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Bienvenida de vuelta</h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>Inicia sesion en tu cuenta Xochic</p>

      {error && (
        <div className="w-full mb-4 p-3 rounded-xl text-sm" style={{ maxWidth: 360, background: "var(--error-light)", color: "var(--error)" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="w-full space-y-4" style={{ maxWidth: 360 }}>
        <div className="relative">
          <IconMail size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Correo electronico" required style={inputStyle} />
        </div>
        <div className="relative">
          <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Contrasena" required style={inputStyle} />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            {showPass
              ? <IconEyeOff size={18} style={{ color: "var(--muted-foreground)" }} />
              : <IconEye    size={18} style={{ color: "var(--muted-foreground)" }} />}
          </button>
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-xs" style={{ color: "var(--primary)", textDecoration: "none" }}>
            Olvide mi contrasena
          </Link>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3.5 rounded-2xl font-semibold text-base transition-opacity"
          style={{ background: "var(--primary)", color: "white", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Entrando..." : "Iniciar sesion"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5 w-full" style={{ maxWidth: 360 }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>o continua con</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      <button onClick={handleGoogle} disabled={loading}
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
