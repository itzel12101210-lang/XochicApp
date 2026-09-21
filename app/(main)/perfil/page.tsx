"use client";
import { IconUser, IconHanger, IconShoppingBag, IconSettings, IconRuler, IconDna, IconTag, IconChevronRight, IconCoin } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const MENU = [
  { icon: IconRuler,       label: "Mis medidas y avatar",  href: "/perfil/medidas",  desc: "Configura tu avatar 3D",           color: "#7B8FC7" },
  { icon: IconDna,         label: "Mi Style DNA",          href: "/perfil/styledna", desc: "Cottagecore + Artesanal MX",       color: "#C4A8D0" },
  { icon: IconTag,         label: "Mis publicaciones",     href: "/perfil/ventas",   desc: "12 prendas activas",               color: "#3BAF76" },
  { icon: IconShoppingBag, label: "Mis compras",           href: "/perfil/compras",  desc: "8 prendas compradas",              color: "#F59E0B" },
  { icon: IconSettings,    label: "Configuracion",         href: "/perfil/ajustes",  desc: "Cuenta, privacidad, pagos",        color: "#94A3B8" },
];

const STATS = [
  { label: "Vendidas", value: "12" },
  { label: "Compras",  value: "8"  },
  { label: "Rating",   value: "4.9★" },
];

export default function PerfilPage() {
  const { user, logout } = useAuth();

  return (
    <div className="page-content" style={{ paddingTop: 0 }}>

      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(180deg, var(--accent-light) 0%, var(--bg) 100%)",
        padding: "24px var(--page-px) 20px",
        marginLeft: "calc(-1 * var(--page-px))",
        marginRight: "calc(-1 * var(--page-px))",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          {/* Avatar */}
          <div style={{
            width: 76, height: 76, borderRadius: 22, flexShrink: 0,
            background: "linear-gradient(135deg, var(--primary), var(--accent))",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(123,143,199,0.3)",
          }}>
            {user?.photoURL
              ? <img src={user.photoURL} alt="" style={{ width: "100%", height: "100%", borderRadius: 22, objectFit: "cover" }} />
              : <IconUser size={34} color="white" strokeWidth={1.8} />
            }
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: 2 }}>
              {user?.nombre ?? "Mi perfil"}
            </h2>
            <p style={{ fontSize: "0.8rem", color: "var(--muted-fg)", marginBottom: 8 }}>
              {user?.email ?? ""}
            </p>
            <span style={{
              display: "inline-block", padding: "3px 10px", borderRadius: "var(--r-full)",
              background: "var(--primary)", color: "white",
              fontSize: "0.7rem", fontWeight: 700,
            }}>
              Vendedora verificada
            </span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {STATS.map(({ label, value }) => (
            <div key={label} style={{
              background: "var(--card)", borderRadius: "var(--r-md)",
              padding: "12px 8px", textAlign: "center",
              border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)",
            }}>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--primary)", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--muted-fg)", marginTop: 2, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Balance card ── */}
      <div style={{
        background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
        borderRadius: "var(--r-xl)", padding: "18px 20px", marginBottom: 20,
        boxShadow: "0 6px 24px rgba(90,110,158,0.35)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem", fontWeight: 600, marginBottom: 4 }}>
              Mi balance Xochic
            </p>
            <p style={{ color: "white", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14 }}>
              $1,240 MXN
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-sm" style={{
                background: "rgba(255,255,255,0.22)", color: "white",
                borderRadius: "var(--r-full)", backdropFilter: "blur(8px)",
              }}>
                Retirar a HSBC
              </button>
              <button className="btn btn-sm" style={{
                background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)",
                borderRadius: "var(--r-full)",
              }}>
                Usar en Xochic
              </button>
            </div>
          </div>
          <IconCoin size={40} color="rgba(255,255,255,0.25)" />
        </div>
      </div>

      {/* ── Menu ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {MENU.map(({ icon: Icon, label, href, desc, color }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", background: "var(--card)",
              borderRadius: "var(--r-lg)", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xs)",
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: color + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={20} style={{ color }} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--foreground)" }}>{label}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--muted-fg)", marginTop: 1 }}>{desc}</p>
              </div>
              <IconChevronRight size={18} style={{ color: "var(--muted-fg)", flexShrink: 0 }} />
            </div>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button onClick={logout} className="btn btn-ghost" style={{ width: "100%", borderRadius: "var(--r-lg)" }}>
        Cerrar sesion
      </button>

    </div>
  );
}
