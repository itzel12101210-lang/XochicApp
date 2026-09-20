"use client";
import { useState } from "react";
import { IconCamera, IconTag, IconRuler, IconPackage, IconCheck } from "@tabler/icons-react";

const CATEGORIAS = ["Tops", "Bottoms", "Vestidos", "Abrigos", "Zapatos", "Accesorios", "Novia / XV", "Graduacion"];
const ESTILOS = ["Cottagecore", "Minimal", "Boho", "Artesanal MX", "Dark Academia", "Y2K", "Streetwear", "Vintage"];
const ESTADOS = ["Nueva con etiqueta", "Nueva sin etiqueta", "Como nuevo", "Buen estado", "Tiene detalles"];
const TALLAS = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "Talla unica", "24", "25", "26", "27", "28", "29", "30", "31", "32"];

export default function VenderPage() {
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estilo, setEstilo] = useState("");
  const [estado, setEstado] = useState("");
  const [talla, setTalla] = useState("");
  const [titulo, setTitulo] = useState("");

  const comision = precio ? Math.round(Number(precio) * 0.09) : 0;
  const recibes = precio ? Number(precio) - comision : 0;

  const inputStyle = {
    background: "var(--input)", border: "1.5px solid var(--border)",
    color: "var(--foreground)", outline: "none", borderRadius: 12,
    padding: "10px 14px", width: "100%", fontSize: "0.875rem"
  };

  return (
    <div className="px-4 pb-6 mt-2">
      <h2 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>Publicar prenda</h2>
      <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>Comision Xochic: solo 9%</p>

      {/* Photo upload */}
      <div className="rounded-2xl flex flex-col items-center justify-center gap-2 mb-5 cursor-pointer"
        style={{ height: 180, border: "2px dashed var(--primary)", background: "var(--muted)" }}>
        <IconCamera size={36} style={{ color: "var(--primary)" }} />
        <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>Agregar fotos</p>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Minimo 1, maximo 8 fotos</p>
      </div>

      {/* Titulo */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Titulo</label>
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)}
          placeholder="ej. Blusa floral boho talla M" style={inputStyle as React.CSSProperties} />
      </div>

      {/* Precio */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Precio (MXN)</label>
        <input type="number" value={precio} onChange={e => setPrecio(e.target.value)}
          placeholder="0" style={inputStyle as React.CSSProperties} />
        {precio && (
          <div className="mt-2 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "var(--muted-foreground)" }}>Precio de venta</span>
              <span style={{ color: "var(--foreground)" }}>${Number(precio).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "var(--muted-foreground)" }}>Comision Xochic (9%)</span>
              <span style={{ color: "var(--error)" }}>-${comision.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold mt-1 pt-1" style={{ borderTop: "1px solid var(--border)" }}>
              <span style={{ color: "var(--foreground)" }}>Tu recibes</span>
              <span style={{ color: "var(--success)" }}>${recibes.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Categoria */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Categoria</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map(c => (
            <button key={c} onClick={() => setCategoria(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: categoria === c ? "var(--primary)" : "var(--muted)", color: categoria === c ? "white" : "var(--muted-foreground)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Talla */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Talla</label>
        <div className="flex flex-wrap gap-2">
          {TALLAS.map(t => (
            <button key={t} onClick={() => setTalla(t)}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: talla === t ? "var(--primary)" : "var(--muted)", color: talla === t ? "white" : "var(--muted-foreground)" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Estilo */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>
          Estilo <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>(elige 1-2)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ESTILOS.map(e => (
            <button key={e} onClick={() => setEstilo(e)}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: estilo === e ? "var(--accent)" : "var(--muted)", color: estilo === e ? "var(--accent-foreground)" : "var(--muted-foreground)" }}>
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Estado */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Estado de la prenda</label>
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map(e => (
            <button key={e} onClick={() => setEstado(e)}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: estado === e ? "var(--success-light)" : "var(--muted)", color: estado === e ? "var(--success)" : "var(--muted-foreground)" }}>
              {estado === e && <IconCheck size={10} className="inline mr-1" />}{e}
            </button>
          ))}
        </div>
      </div>

      {/* Medidas info */}
      <div className="mb-5 p-3 rounded-2xl flex items-center gap-3" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        <IconRuler size={24} style={{ color: "var(--primary)" }} />
        <div>
          <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Agrega medidas exactas</p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Busto, cintura, largo... mas ventas y menos devoluciones</p>
        </div>
      </div>

      {/* Envio info */}
      <div className="mb-5 p-3 rounded-2xl flex items-center gap-3" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        <IconPackage size={24} style={{ color: "var(--primary)" }} />
        <div>
          <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Envio incluido</p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Generamos tu guia de envio al venderse. Compradora paga el envio.</p>
        </div>
      </div>

      {/* Publish */}
      <button
        className="w-full py-4 rounded-2xl font-bold text-base"
        style={{ background: titulo && precio && categoria ? "var(--primary)" : "var(--muted)", color: titulo && precio && categoria ? "white" : "var(--muted-foreground)" }}>
        Publicar prenda
      </button>
    </div>
  );
}
