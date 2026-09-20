// app/(main)/page.tsx - Home / Feed
import {
  IconSparkles,
  IconHanger,
  IconRosette,
  IconScissors,
  IconFlame,
} from "@tabler/icons-react";

const categories = [
  { icon: IconFlame, label: "Trending", color: "#E05252" },
  { icon: IconScissors, label: "Diseñadores", color: "#7B8FC7" },
  { icon: IconRosette, label: "Premium", color: "#C4A8D0" },
  { icon: IconHanger, label: "Segunda mano", color: "#4CAF7D" },
  { icon: IconSparkles, label: "IA Estilista", color: "#F5A623" },
];

const mockPrendas = [
  { id: 1, titulo: "Vestido floral boho", precio: 480, talla: "M", estilo: "Boho Free", vendedora: "@luna.style", imagen: null, estado: "Excelente" },
  { id: 2, titulo: "Blazer oversized crema", precio: 650, talla: "S", estilo: "Minimal Clean", vendedora: "@moda.circular", imagen: null, estado: "Como nuevo" },
  { id: 3, titulo: "Falda midi de mezclilla", precio: 320, talla: "28", estilo: "Y2K Revival", vendedora: "@itzel.closet", imagen: null, estado: "Buen estado" },
  { id: 4, titulo: "Blusa bordada artesanal", precio: 890, talla: "Única", estilo: "Artesanal MX", vendedora: "@oacaxaca.moda", imagen: null, estado: "Nueva" },
];

const estiloBadgeColors: Record<string, string> = {
  "Boho Free": "#C4A8D0",
  "Minimal Clean": "#A4B4DC",
  "Y2K Revival": "#F0A0B5",
  "Artesanal MX": "#9DC49D",
};

export default function HomePage() {
  return (
    <div style={{ padding: "0 0 16px 0" }}>

      {/* Hero banner */}
      <div
        className="mx-4 mt-4 rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
          minHeight: 140,
        }}
      >
        <div
          className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-20"
          style={{ background: "white", transform: "translate(30%, -30%)" }}
        />
        <p className="text-white text-xs font-medium mb-1 opacity-90">Tu Style DNA: Cottagecore + Artesanal</p>
        <h2 className="text-white text-xl font-bold leading-tight mb-3">
          Prendas nuevas<br />que te esperan ✨
        </h2>
        <button
          className="text-sm font-semibold px-4 py-2 rounded-full"
          style={{ background: "white", color: "var(--primary)" }}
        >
          Ver mi feed
        </button>
      </div>

      {/* Categories scroll */}
      <div className="mt-5 mb-1 px-4">
        <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--foreground)" }}>
          Explorar por categoría
        </h3>
      </div>
      <div className="flex gap-3 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {categories.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: color + "22", border: `1.5px solid ${color}44` }}
            >
              <Icon size={24} style={{ color }} />
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--foreground)", whiteSpace: "nowrap" }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Prendas grid */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
            Para ti · basado en tu DNA
          </h3>
          <button className="text-xs font-medium" style={{ color: "var(--primary)" }}>
            Ver todo
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {mockPrendas.map((prenda) => (
            <div
              key={prenda.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Imagen placeholder */}
              <div
                className="w-full flex items-center justify-center"
                style={{
                  height: 160,
                  background: "linear-gradient(135deg, var(--muted), var(--border))",
                }}
              >
                <IconHanger size={40} style={{ color: "var(--muted-foreground)", opacity: 0.4 }} />
              </div>
              {/* Info */}
              <div className="p-3">
                <span
                  className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
                  style={{
                    background: (estiloBadgeColors[prenda.estilo] || "var(--primary)") + "22",
                    color: estiloBadgeColors[prenda.estilo] || "var(--primary)",
                  }}
                >
                  {prenda.estilo}
                </span>
                <p className="text-sm font-semibold leading-tight mb-1" style={{ color: "var(--foreground)" }}>
                  {prenda.titulo}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold" style={{ color: "var(--primary)" }}>
                    ${prenda.precio}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    T. {prenda.talla}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  {prenda.vendedora} · {prenda.estado}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}