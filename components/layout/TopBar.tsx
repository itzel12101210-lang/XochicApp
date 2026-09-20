"use client";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconBell,
  IconShoppingBag,
  IconSparkles,
} from "@tabler/icons-react";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showActions?: boolean;
}

export function TopBar({ title, showBack = false, showActions = true }: TopBarProps) {
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4"
      style={{
        height: 56,
        background: "rgba(247,246,251,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "var(--muted)" }}
          >
            <IconArrowLeft size={20} style={{ color: "var(--foreground)" }} />
          </button>
        ) : (
          <span
            className="font-bold text-xl tracking-tight"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Xochic
          </span>
        )}
        {title && (
          <span
            className="font-semibold text-base"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </span>
        )}
      </div>

      {/* Right actions */}
      {showActions && (
        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "var(--muted)" }}
            title="Asistente IA"
          >
            <IconSparkles size={20} style={{ color: "var(--primary)" }} />
          </button>
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "var(--muted)" }}
            title="Notificaciones"
          >
            <IconBell size={20} style={{ color: "var(--foreground)" }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: "var(--primary)" }}
            />
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "var(--muted)" }}
            title="Carrito"
          >
            <IconShoppingBag size={20} style={{ color: "var(--foreground)" }} />
          </button>
        </div>
      )}
    </header>
  );
}