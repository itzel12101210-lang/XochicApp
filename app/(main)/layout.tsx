"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/bienvenida");
    });
    return () => unsub();
  }, [router]);

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopBar />
      <main style={{ flex: 1, paddingBottom: "calc(72px + env(safe-area-inset-bottom))" }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
