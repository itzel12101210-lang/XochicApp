"use client";
import { useState } from "react";
import { IconSearch, IconFilter, IconHanger, IconHeart, IconRuler } from "@tabler/icons-react";

const ESTILOS = ["Todos", "Cottagecore", "Minimal", "Boho", "Artesanal MX", "Y2K", "Streetwear", "Vintage"];

const PRENDAS = [
  { id: 1, titulo: "Vestido floral boho",      precio: 480,  talla: "M",  estilo: "Boho",         estado: "Excelente",  vendedora: "@luna.style",      likes: 24 },
  { id: 2, titulo: "Blazer crema oversized",   precio: 650,  talla: "S",  estilo: "Minimal",       estado: "Como nuevo", vendedora: "@moda.circular",   likes: 18 },
  { id: 3, titulo: "Falda midi mezclilla",      precio: 320,  talla: "28", estilo: "Y2K",           estado: "Buen estado",vendedora: "@itzel.closet",    likes: 31 },
  { id: 4, titulo: "Blusa bordada artesanal",   precio: 890,  talla: "S",  estilo: "Artesanal MX",  estado: "Nueva",      vendedora: "@oacaxaca.moda",   likes: 47 },
  { id: 5, titulo: "Chamarra de cuero faux",    precio: 1200, talla: "M",  estilo: "Streetwear",    estado: "Como nuevo", vendedora: "@urb.style",       likes: 12 },
  { id: 6, titulo: "Vestido de noche vintage",  precio: 1500, talla: "S",  estilo: "Vintage",       estado: "Excelente",  vendedora: "@glamour.mx",      likes: 56 },
  { id: 7, titulo: "Top crochet hecho a mano",  precio: 420,  talla: "M",  estilo: "Cottagecore",   estado: "Nueva",      vendedora: "@tejidos.sofia",   likes: 88 },
  { id: 8, titulo: "Pantalon palazzo lino",     precio: 560,  talla: "L",  estilo: "Minimal",       estado: "Como nuevo", vendedora: "@slow.fashion.mx", likes: 19 },
];

const ESTILO_COLORS: Record<string, string> = {
  "Boho": "#C4A8D0",
  "Minimal": "#A4B4DC",
  "Y2K": "#F0A0B5",
  "Artesanal MX": "#9DC49D",
  "Streetwear": "#F5A8A8",
  "Vintage": "#F5D5A8",
  "Cottagecore": "#F0C0D0",
};

export default function ExplorarPage() {
  const [estilo, setEstilo] = useState("Todos");
  const [liked, setLiked] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const filtered = PRENDAS.filter(p => {
    const matchEstilo = estilo === "Todos" || p.estilo === estilo;
    const matchSearch = !search || p.titulo.toLowerCase().includes(search.toLowerCase());
    return matchEstilo && matchSearch;
  });

  return (
    <div>
      {/* Search bar */}
      <div className="sticky top-14 z-30 px-4 py-3" style={{ background: "var(--background)" }}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar prendas, estilos, tallas..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
              style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }}
            />
          </div>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--primary)" }}>
            <IconFilter size={18} color="white" />
          </button>
        </div>

        {/* Style chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {ESTILOS.map(e => (
            <button key={e} onClick={() => setEstilo(e)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: estilo === e ? "var(--primary)" : "var(--muted)",
                color: estilo === e ? "white" : "var(--muted-foreground)",
              }}>
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 pb-4">
        <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
          {filtered.length} prendas encontradas
        </p>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(prenda => (
            <div key={prenda.id} className="rounded-2xl overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              {/* Image */}
              <div className="relative w-full flex items-center justify-center"
                style={{ height: 170, background: `${ESTILO_COLORS[prenda.estilo] || "var(--muted)"}33` }}>
                <IconHanger size={44} style={{ color: ESTILO_COLORS[prenda.estilo] || "var(--muted-foreground)", opacity: 0.5 }} />
                <button onClick={() => setLiked(prev => prev.includes(prenda.id) ? prev.filter(i => i !== prenda.id) : [...prev, prenda.id])}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.85)" }}>
                  <IconHeart size={16} fill={liked.includes(prenda.id) ? "var(--primary)" : "none"}
                    style={{ color: "var(--primary)" }} />
                </button>
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(255,255,255,0.85)", color: "var(--foreground)" }}>
                  T.{prenda.talla}
                </span>
              </div>
              {/* Info */}
              <div className="p-3">
                <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5"
                  style={{ background: `${ESTILO_COLORS[prenda.estilo] || "var(--primary)"}22`, color: ESTILO_COLORS[prenda.estilo] || "var(--primary)" }}>
                  {prenda.estilo}
                </span>
                <p className="text-sm font-semibold leading-tight mb-1" style={{ color: "var(--foreground)" }}>
                  {prenda.titulo}
                </p>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base font-bold" style={{ color: "var(--primary)" }}>${prenda.precio}</span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{prenda.estado}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{prenda.vendedora}</p>
                  <button className="flex items-center gap-1 text-xs" style={{ color: "var(--primary)" }}>
                    <IconRuler size={12} /> Probarmelo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
