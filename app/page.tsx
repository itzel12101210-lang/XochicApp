import { redirect } from "next/navigation";

// Root redirect — the main app is at /(main)/page.tsx
// This just redirects / to bienvenida for unauthenticated users
// (the (main)/layout handles auth check client-side)
export default function RootPage() {
  redirect("/bienvenida");
}
