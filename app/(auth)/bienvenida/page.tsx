import Link from "next/link";
import { IconHanger, IconSparkles, IconUsers, IconArrowRight } from "@tabler/icons-react";

export default function WelcomePage() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px 24px" }}>

        {/* Logo */}
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", boxShadow: "var(--shadow-lg)" }}>
          <IconHanger size={40} color="white" />
        </div>

        <h1 className="text-4xl font-bold mb-2 text-center"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Xochic
        </h1>
        <p className="text-center text-sm mb-8" style={{ color: "var(--muted-foreground)", maxWidth: 280 }}>
          Moda sostenible, closet virtual y comunidad creativa
        </p>

        {/* Features */}
        <div className="w-full space-y-3 mb-10" style={{ maxWidth: 340 }}>
          {[
            { icon: IconHanger,   text: "Closet virtual con IA — digitaliza tu ropa real" },
            { icon: IconSparkles, text: "Avatar con tus medidas para probarte prendas" },
            { icon: IconUsers,    text: "Comunidad de diseñadores y moda a la medida" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--muted)" }}>
                <Icon size={20} style={{ color: "var(--primary)" }} />
              </div>
              <p className="text-sm" style={{ color: "var(--foreground)" }}>{text}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="w-full space-y-3" style={{ maxWidth: 340 }}>
          <Link href="/registro"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-base"
            style={{ background: "var(--primary)", color: "white", textDecoration: "none" }}>
            Crear cuenta gratis <IconArrowRight size={18} />
          </Link>
          <Link href="/login"
            className="flex items-center justify-center w-full py-3.5 rounded-2xl font-semibold text-base"
            style={{ background: "transparent", color: "var(--primary)", border: "2px solid var(--primary)", textDecoration: "none" }}>
            Ya tengo cuenta
          </Link>
        </div>
      </div>
      <p className="text-center text-xs pb-8" style={{ color: "var(--muted-foreground)" }}>
        Comision solo 8-10% · Moda sostenible · LATAM
      </p>
    </div>
  );
}
