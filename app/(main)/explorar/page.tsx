"use client";
import { useState, useEffect } from "react";
import { IconSearch, IconFilter, IconHanger, IconHeart, IconLoader2 } from "@tabler/icons-react";
import { getPrendas, toggleLike, type Prenda } from "@/lib/prendas";
import Image from "next/image";
import Link from "next/link";

const ESTILOS = ["Todos","Cottagecore","Minimal","Boho","Artesanal MX","Y2K","Streetwear","Vintage"];
const ESTILO_COLORS: Record<string,string> = {
  "Boho":"#C4A8D0","Minimal":"#A4B4DC","Y2K":"#F0A0B5",
  "Artesanal MX":"#9DC49D","Streetwear":"#F5A8A8","Vintage":"#F5D5A8","Cottagecore":"#F0C0D0",
};

export default function ExplorarPage() {
  const [prendas,   setPrendas]   = useState<Prenda[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [estilo,    setEstilo]    = useState("Todos");
  const [search,    setSearch]    = useState("");
  const [liked,     setLiked]     = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getPrendas({ lim: 40 });
        setPrendas(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const handleLike = async (prenda: Prenda) => {
    if (!prenda.id) return;
    const isLiked = liked.includes(prenda.id);
    setLiked(prev => isLiked ? prev.filter(id => id !== prenda.id) : [...prev, prenda.id!]);
    await toggleLike(prenda.id, isLiked ? -1 : 1);
  };

  const filtered = prendas.filter(p => {
    const matchEstilo = estilo === "Todos" || p.estilos?.includes(estilo);
    const matchSearch = !search || p.titulo.toLowerCase().includes(search.toLowerCase());
    return matchEstilo && matchSearch;
  });

  return (
    <div>
      {/* Search */}
      <div className="sticky top-14 z-30 px-4 py-3" style={{ background: "var(--background)" }}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar prendas, estilos, tallas..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
              style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }} />
          </div>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary)" }}>
            <IconFilter size={18} color="white" />
          </button>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {ESTILOS.map(e => (
            <button key={e} onClick={() => setEstilo(e)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: estilo === e ? "var(--primary)" : "var(--muted)", color: estilo === e ? "white" : "var(--muted-foreground)" }}>
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <IconLoader2 size={32} className="animate-spin" style={{ color: "var(--primary)" }} />
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Cargando prendas...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <IconHanger size={48} style={{ color: "var(--muted-foreground)", opacity: 0.4 }} />
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              {prendas.length === 0 ? "Aun no hay prendas" : "Sin resultados"}
            </p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {prendas.length === 0 ? "Se la primera en publicar algo!" : "Prueba otro estilo o busqueda"}
            </p>
            {prendas.length === 0 && (
              <Link href="/vender" className="px-5 py-2.5 rounded-full text-sm font-semibold mt-2"
                style={{ background: "var(--primary)", color: "white", textDecoration: "none" }}>
                Publicar prenda
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
              {filtered.length} prendas
            </p>
            <div className="grid grid-cols-2 gap-3">
              {filtered.map(prenda => {
                const isLiked = liked.includes(prenda.id!);
                const color   = ESTILO_COLORS[prenda.estilos?.[0]] ?? "var(--muted)";
                return (
                  <div key={prenda.id} className="rounded-2xl overflow-hidden"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
                    {/* Image */}
                    <div className="relative w-full" style={{ height: 170 }}>
                      {prenda.imagenes?.[0] ? (
                        <Image src={prenda.imagenes[0]} alt={prenda.titulo} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: color + "33" }}>
                          <IconHanger size={44} style={{ color, opacity: 0.5 }} />
                        </div>
                      )}
                      <button onClick={() => handleLike(prenda)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.9)" }}>
                        <IconHeart size={16}
                          fill={isLiked ? "var(--primary)" : "none"}
                          style={{ color: "var(--primary)" }} />
                      </button>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(255,255,255,0.9)", color: "var(--foreground)" }}>
                        T.{prenda.talla}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      {prenda.estilos?.[0] && (
                        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5"
                          style={{ background: color + "22", color }}>
                          {prenda.estilos[0]}
                        </span>
                      )}
                      <p className="text-sm font-semibold leading-tight mb-1" style={{ color: "var(--foreground)" }}>
                        {prenda.titulo}
                      </p>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base font-bold" style={{ color: "var(--primary)" }}>
                          ${prenda.precio.toLocaleString()}
                        </span>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{prenda.estado}</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {prenda.vendedoraNombre}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
