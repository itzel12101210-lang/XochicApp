import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xochic — Moda Sostenible",
  description: "Compra, vende y descubre moda sostenible. Clóset virtual, avatar con tus medidas y comunidad de diseñadores.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Xochic",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#7B8FC7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
