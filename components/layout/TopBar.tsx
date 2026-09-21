"use client";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconBell, IconShoppingBag, IconSparkles } from "@tabler/icons-react";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showActions?: boolean;
  transparent?: boolean;
}

export function TopBar({ title, showBack = false, showActions = true, transparent = false }: TopBarProps) {
  const router = useRouter();

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      height: 56,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px",
      background: transparent ? "transparent" : "rgba(247,245,251,0.92)",
      backdropFilter: transparent ? "none" : "blur(16px)",
      WebkitBackdropFilter: transparent ? "none" : "blur(16px)",
      borderBottom: transparent ? "none" : "1px solid var(--border)",
      transition: "background 0.3s",
    }}>
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showBack ? (
          <button onClick={() => router.back()} style={{
            width: 36, height: 36, borderRadius: 10,
            background: "var(--muted)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <IconArrowLeft size={18} style={{ color: "var(--foreground)" }} />
          </button>
        ) : (
          <span className="text-brand" style={{
            fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.03em",
          }}>
            Xochic
          </span>
        )}
        {title && (
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--foreground)", letterSpacing: "-0.01em" }}>
            {title}
          </span>
        )}
      </div>

      {/* Right actions */}
      {showActions && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton icon={IconSparkles} color="var(--primary)" title="Asistente IA" />
          <IconButton icon={IconBell}    color="var(--foreground-soft)" title="Notificaciones" badge />
          <IconButton icon={IconShoppingBag} color="var(--foreground-soft)" title="Carrito" />
        </div>
      )}
    </header>
  );
}

function IconButton({
  icon: Icon, color, title, badge = false
}: { icon: any; color: string; title: string; badge?: boolean }) {
  return (
    <button title={title} style={{
      width: 36, height: 36, borderRadius: 10,
      background: "var(--muted)", border: "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", position: "relative",
    }}>
      <Icon size={18} style={{ color }} />
      {badge && (
        <span style={{
          position: "absolute", top: 7, right: 7,
          width: 7, height: 7, borderRadius: 99,
          background: "var(--primary)",
          border: "1.5px solid var(--card)",
        }} />
      )}
    </button>
  );
}
