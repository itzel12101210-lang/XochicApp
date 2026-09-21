import Link from "next/link";
import { IconHanger, IconSparkles, IconUsers, IconArrowRight, IconRuler } from "@tabler/icons-react";

const FEATURES = [
  { icon: IconHanger,   color: "#7B8FC7", label: "Closet virtual con IA",   desc: "Digitaliza tu ropa real y combina outfits" },
  { icon: IconRuler,    color: "#C4A8D0", label: "Avatar con tus medidas",  desc: "Probate prendas virtualmente antes de comprar" },
  { icon: IconUsers,    color: "#3BAF76", label: "Comunidad creativa",      desc: "Disenadoras locales, moda a la medida" },
  { icon: IconSparkles, color: "#F59E0B", label: "Estilista IA personal",   desc: "Recomendaciones basadas en tu Style DNA" },
];

export default function WelcomePage() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>

      {/* ── Top gradient area ── */}
      <div style={{
        background: "linear-gradient(180deg, var(--accent-light) 0%, var(--bg) 100%)",
        padding: "56px 24px 32px",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        {/* Logo mark */}
        <div style={{
          width: 80, height: 80, borderRadius: 24,
          background: "linear-gradient(135deg, var(--primary), var(--accent))",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20, boxShadow: "0 8px 32px rgba(123,143,199,0.35)",
        }}>
          <IconHanger size={40} color="white" strokeWidth={1.8} />
        </div>

        <h1 className="text-brand" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 8 }}>
          Xochic
        </h1>
        <p style={{ textAlign: "center", color: "var(--muted-fg)", fontSize: "1rem", maxWidth: 260, lineHeight: 1.5 }}>
          Moda sostenible, closet virtual y comunidad creativa
        </p>
      </div>

      {/* ── Features ── */}
      <div style={{ padding: "8px 24px 28px", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360, margin: "0 auto" }}>
          {FEATURES.map(({ icon: Icon, color, label, desc }) => (
            <div key={label} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "14px 16px", borderRadius: "var(--r-lg)",
              background: "var(--card)", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xs)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: color + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={22} style={{ color }} strokeWidth={1.8} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--foreground)", marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: "0.78rem", color: "var(--muted-fg)", lineHeight: 1.4 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTAs ── */}
      <div style={{ padding: "0 24px 40px", display: "flex", flexDirection: "column", gap: 12, maxWidth: 360, margin: "0 auto", width: "100%" }}>
        <Link href="/registro" className="btn btn-primary btn-lg" style={{
          textDecoration: "none", borderRadius: "var(--r-xl)",
          background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
          boxShadow: "0 4px 20px rgba(123,143,199,0.4)",
        }}>
          Crear cuenta gratis <IconArrowRight size={18} />
        </Link>
        <Link href="/login" className="btn btn-outline btn-lg" style={{
          textDecoration: "none", borderRadius: "var(--r-xl)",
        }}>
          Ya tengo cuenta
        </Link>
        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--muted-fg)", marginTop: 4 }}>
          Solo 9% de comision · Moda sostenible · LATAM
        </p>
      </div>

    </div>
  );
}
