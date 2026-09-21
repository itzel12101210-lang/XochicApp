import { IconFlame, IconScissors, IconRosette, IconHanger, IconSparkles, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

const CATS = [
  { icon: IconFlame,    label: "Trending",      color: "#E05252", bg: "#FCDEDE" },
  { icon: IconScissors, label: "Disenadoras",   color: "#7B8FC7", bg: "#E4E9F7" },
  { icon: IconRosette,  label: "Premium",       color: "#C4A8D0", bg: "#EDE4F4" },
  { icon: IconHanger,   label: "Segunda mano",  color: "#3BAF76", bg: "#D2F0E3" },
  { icon: IconSparkles, label: "IA Estilista",  color: "#F59E0B", bg: "#FEF3C7" },
];

const PRENDAS = [
  { id: "1", titulo: "Vestido floral boho",     precio: 480,  talla: "M",  estilo: "Boho",        vendedora: "@luna.style",    estado: "Excelente",  color: "#C4A8D0" },
  { id: "2", titulo: "Blazer oversized crema",  precio: 650,  talla: "S",  estilo: "Minimal",     vendedora: "@moda.circular", estado: "Como nuevo", color: "#A4B4DC" },
  { id: "3", titulo: "Falda midi mezclilla",    precio: 320,  talla: "28", estilo: "Y2K",         vendedora: "@itzel.closet",  estado: "Buen estado",color: "#F0A0B5" },
  { id: "4", titulo: "Blusa bordada artesanal", precio: 890,  talla: "S",  estilo: "Artesanal MX",vendedora: "@oaxaca.moda",   estado: "Nueva",      color: "#9DC49D" },
];

export default function HomePage() {
  return (
    <div className="page-content" style={{ paddingTop: 16 }}>

      {/* ── Hero Banner ── */}
      <div style={{
        borderRadius: "var(--r-xl)",
        background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
        padding: "24px 20px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)", top: -30, right: -20 }} />
        <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)", bottom: -20, right: 40 }} />

        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Tu Style DNA: Cottagecore + Artesanal
        </p>
        <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>
          Nuevas prendas<br />te esperan hoy
        </h2>
        <Link href="/explorar" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "white", color: "var(--primary)",
          padding: "10px 18px", borderRadius: "var(--r-full)",
          fontWeight: 700, fontSize: "0.85rem", textDecoration: "none",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        }}>
          Ver mi feed <IconArrowRight size={15} />
        </Link>
      </div>

      {/* ── Categories ── */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-header">
          <h3>Categorias</h3>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {CATS.map(({ icon: Icon, label, color, bg }) => (
            <Link key={label} href="/explorar" style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              flexShrink: 0, textDecoration: "none",
            }}>
              <div style={{
                width: 58, height: 58, borderRadius: "var(--r-lg)",
                background: bg, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 2px 12px ${color}30`,
              }}>
                <Icon size={26} style={{ color }} />
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--foreground-soft)", whiteSpace: "nowrap" }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Promo strip ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, justifyContent: "center",
        padding: "12px 16px", borderRadius: "var(--r-md)",
        background: "var(--accent-light)", border: "1px solid var(--accent)",
        marginBottom: 28,
      }}>
        <IconSparkles size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
        <p style={{ fontSize: "0.8rem", color: "var(--accent-fg)", fontWeight: 500 }}>
          <strong>9% de comision</strong> — vs 19% de Trendier. Tu ganas mas con Xochic.
        </p>
      </div>

      {/* ── Feed prendas ── */}
      <div>
        <div className="section-header">
          <h3>Para ti · segun tu DNA</h3>
          <Link href="/explorar">Ver todo</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {PRENDAS.map((p) => (
            <Link key={p.id} href={`/explorar/${p.id}`} style={{ textDecoration: "none" }}>
              <div className="card card-hover" style={{ borderRadius: "var(--r-lg)" }}>
                {/* Image placeholder */}
                <div style={{
                  height: 170, background: `${p.color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <IconHanger size={44} style={{ color: p.color, opacity: 0.5 }} />
                  {/* Talla badge */}
                  <span style={{
                    position: "absolute", top: 8, left: 8,
                    background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
                    padding: "3px 9px", borderRadius: "var(--r-full)",
                    fontSize: "0.7rem", fontWeight: 700, color: "var(--foreground)",
                  }}>
                    T.{p.talla}
                  </span>
                </div>
                {/* Info */}
                <div style={{ padding: "10px 12px 12px" }}>
                  <span style={{
                    display: "inline-block",
                    fontSize: "0.65rem", fontWeight: 700,
                    color: p.color, background: `${p.color}20`,
                    padding: "2px 8px", borderRadius: "var(--r-full)",
                    marginBottom: 6,
                  }}>
                    {p.estilo}
                  </span>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3, marginBottom: 8 }}>
                    {p.titulo}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="text-price">${p.precio.toLocaleString()}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--muted-fg)" }}>{p.estado}</span>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "var(--muted-fg)", marginTop: 4 }}>{p.vendedora}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
