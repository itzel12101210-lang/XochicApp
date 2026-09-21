"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome2, IconSearch, IconHanger, IconTag, IconUser } from "@tabler/icons-react";

const NAV = [
  { href: "/",        icon: IconHome2,  label: "Inicio"   },
  { href: "/explorar",icon: IconSearch, label: "Explorar" },
  { href: "/closet",  icon: IconHanger, label: "Closet"   },
  { href: "/vender",  icon: IconTag,    label: "Vender"   },
  { href: "/perfil",  icon: IconUser,   label: "Perfil"   },
];

export function BottomNav() {
  const path = usePathname();

  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      background: "var(--card)",
      borderTop: "1px solid var(--border)",
      paddingBottom: "env(safe-area-inset-bottom)",
      boxShadow: "0 -4px 24px rgba(91,80,130,0.10)",
    }}>
      <div style={{ display: "flex", height: 64 }}>
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link key={href} href={href} style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 3,
              textDecoration: "none", position: "relative",
              transition: "opacity 0.15s",
            }}>
              {/* Active indicator dot */}
              {active && (
                <span style={{
                  position: "absolute", top: 8, left: "50%",
                  transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: 99,
                  background: "var(--primary)",
                }} />
              )}
              <div style={{
                padding: "6px 16px", borderRadius: 12,
                background: active ? "var(--accent-light)" : "transparent",
                transition: "background 0.2s",
              }}>
                <Icon
                  size={22}
                  stroke={active ? 2.5 : 1.6}
                  style={{ color: active ? "var(--primary)" : "var(--muted-fg)", display: "block" }}
                />
              </div>
              <span style={{
                fontSize: "0.62rem", fontWeight: active ? 700 : 500,
                color: active ? "var(--primary)" : "var(--muted-fg)",
                letterSpacing: "0.02em",
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
