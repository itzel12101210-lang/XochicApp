"use client";
import { IconUser, IconHanger, IconShoppingBag, IconStar, IconSettings, IconRuler, IconDna, IconTag } from "@tabler/icons-react";
import Link from "next/link";

const STATS = [
  { label: "Prendas vendidas", value: 12 },
  { label: "Compras",          value: 8 },
  { label: "Valoracion",       value: "4.9" },
];

const MENU_ITEMS = [
  { icon: IconRuler,       label: "Mis medidas y avatar",  href: "/perfil/medidas",   desc: "Configura tu avatar 3D" },
  { icon: IconDna,         label: "Mi Style DNA",          href: "/perfil/styledna",  desc: "Cottagecore + Artesanal MX" },
  { icon: IconTag,         label: "Mis publicaciones",     href: "/perfil/ventas",    desc: "12 prendas activas" },
  { icon: IconShoppingBag, label: "Mis compras",           href: "/perfil/compras",   desc: "8 prendas compradas" },
  { icon: IconSettings,    label: "Configuracion",         href: "/perfil/ajustes",   desc: "Cuenta, privacidad, pagos" },
];

export default function PerfilPage() {
  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-4 pt-4 pb-5"
        style={{ background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)" }}>
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <IconUser size={36} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Itzel</h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>@itzel.closet</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: "var(--primary)", color: "white" }}>
              Vendedora verificada
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {STATS.map(({ label, value }) => (
            <div key={label} className="rounded-2xl p-3 text-center"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="text-lg font-bold" style={{ color: "var(--primary)" }}>{value}</div>
              <div className="text-xs leading-tight mt-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Balance card */}
      <div className="mx-4 mb-4 p-4 rounded-2xl"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))" }}>
        <p className="text-white text-xs opacity-80 mb-1">Mi balance Xochic</p>
        <p className="text-white text-2xl font-bold mb-1">$1,240 MXN</p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            Retirar a HSBC
          </button>
          <button className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            Usar en Xochic
          </button>
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 space-y-2">
        {MENU_ITEMS.map(({ icon: Icon, label, href, desc }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--muted)" }}>
              <Icon size={20} style={{ color: "var(--primary)" }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{label}</p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
            </div>
            <span style={{ color: "var(--muted-foreground)", fontSize: "1.2rem" }}>›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
