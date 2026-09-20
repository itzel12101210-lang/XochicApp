import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <main className="main-content flex-1">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}