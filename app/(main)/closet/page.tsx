"use client";
import { useState } from "react";
import { IconHanger, IconCamera, IconSparkles, IconPlus, IconDna } from "@tabler/icons-react";

const CATS = ["Todas", "Tops", "Bottoms", "Vestidos", "Zapatos", "Accesorios"];

const MOCK_PRENDAS = [
  { id: 1, nombre: "Blusa romantica",   cat: "Tops",      color: "#f9a8d4", estilo: "Cottagecore" },
  { id: 2, nombre: "Falda midi boho",   cat: "Bottoms",   color: "#fde68a", estilo: "Boho" },
  { id: 3, nombre: "Jeans clasicos",    cat: "Bottoms",   color: "#93c5fd", estilo: "Casual" },
  { id: 4, nombre: "Tacones rosas",     cat: "Zapatos",   color: "#fca5a5", estilo: "Vintage" },
  { id: 5, nombre: "Blazer verde",      cat: "Tops",      color: "#6ee7b7", estilo: "Minimal" },
  { id: 6, nombre: "Bolso lila",        cat: "Accesorios",color: "#c4b5fd", estilo: "Y2K" },
  { id: 7, nombre: "Vestido floral",    cat: "Vestidos",  color: "#f0abfc", estilo: "Cottagecore" },
  { id: 8, nombre: "Sneakers blancos",  cat: "Zapatos",   color: "#e2e8f0", estilo: "Street" },
];

export default function ClosetPage() {
  const [cat, setCat] = useState("Todas");
  const [tab, setTab] = useState<"closet" | "outfit">("closet");

  const filtered = cat === "Todas" ? MOCK_PRENDAS : MOCK_PRENDAS.filter(p => p.cat === cat);

  return (
    <div>
      {/* Tabs */}
      <div className="flex mx-4 mt-4 gap-2">
        {(["closet", "outfit"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: tab === t ? "var(--primary)" : "var(--muted)",
              color: tab === t ? "white" : "var(--muted-foreground)",
            }}>
            {t === "closet" ? "Mi Closet" : "Outfit IA"}
          </button>
        ))}
      </div>

      {tab === "closet" && (
        <>
          {/* Stats */}
          <div className="flex gap-3 mx-4 mt-4">
            {[
              { label: "Prendas", value: MOCK_PRENDAS.length },
              { label: "Categorias", value: 5 },
              { label: "Sin usar 6m", value: 2, alert: true },
            ].map(({ label, value, alert }) => (
              <div key={label} className="flex-1 rounded-2xl p-3 text-center"
                style={{ background: alert ? "var(--warning-light)" : "var(--card)", border: "1px solid var(--border)" }}>
                <div className="text-xl font-bold" style={{ color: alert ? "var(--warning)" : "var(--primary)" }}>{value}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex gap-2 px-4 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: cat === c ? "var(--primary)" : "var(--muted)", color: cat === c ? "white" : "var(--muted-foreground)" }}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-2.5 px-4 mt-3">
            {filtered.map(p => (
              <div key={p.id} className="rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: `1.5px solid ${p.color}66`, background: `${p.color}22` }}>
                <div className="flex items-center justify-center" style={{ height: 90 }}>
                  <IconHanger size={36} style={{ color: p.color, opacity: 0.7 }} />
                </div>
                <div className="px-2 pb-2">
                  <p className="text-xs font-semibold leading-tight" style={{ color: "var(--foreground)" }}>{p.nombre}</p>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.estilo}</span>
                </div>
              </div>
            ))}

            {/* Add button */}
            <button className="rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer"
              style={{ height: 130, border: "2px dashed var(--border)", background: "transparent" }}>
              <IconPlus size={24} style={{ color: "var(--muted-foreground)" }} />
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Agregar</span>
            </button>
          </div>

          {/* Scan CTA */}
          <div className="mx-4 mt-4 p-4 rounded-2xl flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
            <IconCamera size={28} color="white" />
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Fotografiar prenda</p>
              <p className="text-white text-xs opacity-80">La IA la digitaliza automaticamente</p>
            </div>
          </div>
        </>
      )}

      {tab === "outfit" && (
        <div className="px-4 mt-4">
          <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
            La IA combina tu ropa para la ocasion:
          </p>
          {/* Ocasion buttons */}
          <div className="flex flex-wrap gap-2 mb-5">
            {["Casual", "Trabajo", "Cita", "Fiesta", "Gym"].map(o => (
              <button key={o} className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                {o}
              </button>
            ))}
          </div>
          {/* Outfit slots */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {["Top", "Bottom", "Zapatos"].map(slot => (
              <div key={slot} className="rounded-2xl flex flex-col items-center justify-center gap-1"
                style={{ height: 100, border: "2px dashed var(--border)", background: "var(--muted)" }}>
                <IconHanger size={28} style={{ color: "var(--muted-foreground)" }} />
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{slot}</span>
              </div>
            ))}
          </div>
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold"
            style={{ background: "var(--primary)", color: "white" }}>
            <IconSparkles size={18} /> Generar outfit con IA
          </button>
          <div className="mt-4 p-3 rounded-2xl flex items-center gap-2"
            style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
            <IconDna size={20} style={{ color: "var(--primary)" }} />
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Tu Style DNA: <strong style={{ color: "var(--foreground)" }}>Cottagecore + Artesanal MX</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
