"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  IconCamera, IconPackage, IconCheck, IconX, IconLoader2,
} from "@tabler/icons-react";
import { useAuth }      from "@/hooks/useAuth";
import { uploadFiles }  from "@/lib/storage";
import { crearPrenda }  from "@/lib/prendas";
import Image            from "next/image";

const CATEGORIAS = ["Tops","Bottoms","Vestidos","Abrigos","Zapatos","Accesorios","Novia / XV","Graduacion"];
const ESTILOS    = ["Cottagecore","Minimal","Boho","Artesanal MX","Dark Academia","Y2K","Streetwear","Vintage"];
const ESTADOS    = ["Nueva con etiqueta","Nueva sin etiqueta","Como nuevo","Buen estado","Tiene detalles"];
const TALLAS     = ["XXS","XS","S","M","L","XL","XXL","Unica","24","25","26","27","28","29","30","31","32"];

export default function VenderPage() {
  const router        = useRouter();
  const { user }      = useAuth();
  const fileRef       = useRef<HTMLInputElement>(null);

  const [titulo,    setTitulo]    = useState("");
  const [desc,      setDesc]      = useState("");
  const [precio,    setPrecio]    = useState("");
  const [categoria, setCategoria] = useState("");
  const [estilos,   setEstilos]   = useState<string[]>([]);
  const [estado,    setEstado]    = useState("");
  const [talla,     setTalla]     = useState("");
  const [imagenes,  setImagenes]  = useState<{ file: File; preview: string }[]>([]);
  const [progress,  setProgress]  = useState(0);
  const [uploading, setUploading] = useState(false);
  const [published, setPublished] = useState(false);
  const [error,     setError]     = useState("");

  const comision = precio ? Math.round(Number(precio) * 0.09) : 0;
  const recibes  = precio ? Number(precio) - comision        : 0;
  const canPost  = titulo && precio && categoria && estado && talla;

  const toggleEstilo = (e: string) =>
    setEstilos(prev => prev.includes(e) ? prev.filter(x => x !== e) : prev.length < 2 ? [...prev, e] : prev);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 8 - imagenes.length);
    setImagenes(prev => [...prev, ...arr.map(file => ({ file, preview: URL.createObjectURL(file) }))]);
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(imagenes[i].preview);
    setImagenes(prev => prev.filter((_, idx) => idx !== i));
  };

  const handlePublish = async () => {
    if (!canPost) { setError("Completa los campos obligatorios (*)"); return; }
    if (!user)    { setError("Debes iniciar sesion."); return; }
    setError(""); setUploading(true); setProgress(0);

    try {
      // 1. Subir fotos a Firebase Storage
      const uploaded = imagenes.length > 0
        ? await uploadFiles(
            imagenes.map(i => i.file),
            `prendas/${user.uid}`,
            (pct) => setProgress(pct)
          )
        : [];

      // 2. Crear prenda en Firestore
      await crearPrenda({
        titulo,
        descripcion: desc,
        precio: Number(precio),
        talla, categoria, estilos, estado,
        imagenes:    uploaded.map(u => u.url),
        imagenesIds: uploaded.map(u => u.path),
        medidas: {},
        vendedoraId:     user.uid,
        vendedoraNombre: user.nombre ?? "Vendedora",
        vendedoraFoto:   user.photoURL ?? undefined,
      });

      setPublished(true);
      setTimeout(() => router.push("/explorar"), 1800);
    } catch (e: any) {
      setError(e.message ?? "Error al publicar. Intenta de nuevo.");
    } finally { setUploading(false); }
  };

  // ── Helpers de estilo ──
  const chip = (active: boolean, successColor = false) => ({
    background: active ? (successColor ? "var(--success-light)" : "var(--primary)") : "var(--muted)",
    color:      active ? (successColor ? "var(--success)"       : "white")          : "var(--muted-foreground)",
    border:     "1.5px solid transparent",
    borderRadius: 999, padding: "6px 14px",
    fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
    transition: "all 0.15s",
  } as React.CSSProperties);

  // ── Pantalla de exito ──
  if (published) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "var(--success-light)" }}>
        <IconCheck size={40} style={{ color: "var(--success)" }} />
      </div>
      <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Prenda publicada</h2>
      <p className="text-sm text-center" style={{ color: "var(--muted-foreground)" }}>
        Ya esta visible en el marketplace.<br />Te avisamos cuando alguien la compre.
      </p>
    </div>
  );

  return (
    <div className="px-4 pb-8 mt-2">
      <h2 className="text-xl font-bold mb-1"  style={{ color: "var(--foreground)" }}>Publicar prenda</h2>
      <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>Comision solo 9% — de las mas bajas del mercado</p>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "var(--error-light)", color: "var(--error)" }}>
          {error}
        </div>
      )}

      {/* ── Fotos ── */}
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => handleFiles(e.target.files)} />

      <div className="grid grid-cols-4 gap-2 mb-5">
        {imagenes.map((img, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1" }}>
            <Image src={img.preview} alt="" fill style={{ objectFit: "cover" }} />
            <button onClick={() => removeImage(i)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.6)" }}>
              <IconX size={11} color="white" />
            </button>
          </div>
        ))}
        {imagenes.length < 8 && (
          <button onClick={() => fileRef.current?.click()}
            className="rounded-xl flex flex-col items-center justify-center gap-1"
            style={{ aspectRatio: "1", border: "2px dashed var(--primary)", background: "var(--muted)", cursor: "pointer" }}>
            <IconCamera size={20} style={{ color: "var(--primary)" }} />
            <span className="text-xs" style={{ color: "var(--primary)", fontWeight: 600 }}>
              {imagenes.length === 0 ? "Fotos" : "+"}
            </span>
          </button>
        )}
      </div>

      {/* ── Titulo ── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Titulo *</label>
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)}
          placeholder="ej. Blusa floral boho talla M"
          className="w-full px-4 py-3 rounded-xl text-sm"
          style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }} />
      </div>

      {/* ── Descripcion ── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Descripcion</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3}
          placeholder="Marca, materiales, detalles..."
          className="w-full px-4 py-3 rounded-xl text-sm resize-none"
          style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }} />
      </div>

      {/* ── Precio ── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Precio MXN *</label>
        <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="0"
          className="w-full px-4 py-3 rounded-xl text-sm"
          style={{ background: "var(--input)", border: "1.5px solid var(--border)", color: "var(--foreground)", outline: "none" }} />
        {precio && (
          <div className="mt-2 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "var(--muted-foreground)" }}>Precio</span>
              <span>${Number(precio).toLocaleString()} MXN</span>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "var(--muted-foreground)" }}>Comision Xochic (9%)</span>
              <span style={{ color: "var(--error)" }}>-${comision.toLocaleString()} MXN</span>
            </div>
            <div className="flex justify-between font-bold text-sm pt-1" style={{ borderTop: "1px solid var(--border)" }}>
              <span>Tu recibes</span>
              <span style={{ color: "var(--success)" }}>${recibes.toLocaleString()} MXN</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Categoria ── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Categoria *</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map(c => <button key={c} onClick={() => setCategoria(c)} style={chip(categoria === c)}>{c}</button>)}
        </div>
      </div>

      {/* ── Talla ── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Talla *</label>
        <div className="flex flex-wrap gap-2">
          {TALLAS.map(t => <button key={t} onClick={() => setTalla(t)} style={chip(talla === t)}>{t}</button>)}
        </div>
      </div>

      {/* ── Estilo ── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          Estilo <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}>(max 2)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ESTILOS.map(e => <button key={e} onClick={() => toggleEstilo(e)} style={chip(estilos.includes(e))}>{e}</button>)}
        </div>
      </div>

      {/* ── Estado ── */}
      <div className="mb-5">
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Estado *</label>
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map(e => (
            <button key={e} onClick={() => setEstado(e)} style={chip(estado === e, true)}>
              {estado === e && <IconCheck size={10} className="inline mr-1" />}{e}
            </button>
          ))}
        </div>
      </div>

      {/* ── Envio ── */}
      <div className="mb-5 p-3 rounded-2xl flex items-center gap-3" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        <IconPackage size={22} style={{ color: "var(--primary)" }} />
        <div>
          <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Envio gestionado por Xochic</p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Al venderse generamos tu guia de envio automaticamente.</p>
        </div>
      </div>

      {/* ── Progress bar (mientras sube) ── */}
      {uploading && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>
            <span>Subiendo fotos...</span><span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "var(--muted)" }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: "var(--primary)" }} />
          </div>
        </div>
      )}

      {/* ── Boton publicar ── */}
      <button onClick={handlePublish} disabled={uploading || !canPost}
        className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
        style={{
          background: canPost ? "var(--primary)" : "var(--muted)",
          color: canPost ? "white" : "var(--muted-foreground)",
          opacity: uploading ? 0.8 : 1,
          cursor: canPost ? "pointer" : "default",
        }}>
        {uploading
          ? <><IconLoader2 size={20} className="animate-spin" /> Subiendo {progress}%...</>
          : "Publicar prenda"}
      </button>
    </div>
  );
}
