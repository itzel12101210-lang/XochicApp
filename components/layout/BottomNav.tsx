"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome2,
  IconSearch,
  IconHanger,
  IconTag,
  IconUser,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: IconHome2, label: "Inicio" },
  { href: "/explorar", icon: IconSearch, label: "Explorar" },
  { href: "/closet", icon: IconHanger, label: "Closet" },
  { href: "/vender", icon: IconTag, label: "Vender" },
  { href: "/perfil", icon: IconUser, label: "Perfil" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -4px 24px rgba(91,80,130,0.08)",
      }}
    >
      <div className="flex items-center justify-around px-2" style={{ height: 64 }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all"
              style={{ minWidth: 0 }}
            >
              <Icon
                size={24}
                stroke={isActive ? 2.5 : 1.5}
                style={{
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                  transition: "color 0.2s",
                }}
              />
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                  transition: "color 0.2s",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}