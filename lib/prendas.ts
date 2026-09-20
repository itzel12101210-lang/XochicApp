// lib/prendas.ts — CRUD de prendas en Firestore
import {
  collection, addDoc, getDocs, getDoc, doc,
  query, where, orderBy, limit, updateDoc,
  serverTimestamp, type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Prenda {
  id?: string;
  titulo: string;
  descripcion: string;
  precio: number;
  talla: string;
  categoria: string;
  estilos: string[];
  estado: string;
  imagenes: string[];       // URLs de Cloudinary
  imagenesIds: string[];    // public_ids de Cloudinary
  medidas: Record<string, string>;
  vendedoraId: string;
  vendedoraNombre: string;
  vendedoraFoto?: string;
  likes: number;
  vendida: boolean;
  creadaEn?: any;
}

export interface CreatePrendaInput extends Omit<Prenda, "id" | "likes" | "vendida" | "creadaEn"> {}

// Crear prenda
export async function crearPrenda(data: CreatePrendaInput): Promise<string> {
  const ref = await addDoc(collection(db, "prendas"), {
    ...data,
    likes: 0,
    vendida: false,
    creadaEn: serverTimestamp(),
  });
  return ref.id;
}

// Obtener todas las prendas disponibles (no vendidas)
export async function getPrendas(filtros?: {
  categoria?: string;
  estilos?: string[];
  maxPrecio?: number;
  lim?: number;
}): Promise<Prenda[]> {
  const q = query(
    collection(db, "prendas"),
    where("vendida", "==", false),
    orderBy("creadaEn", "desc"),
    limit(filtros?.lim ?? 40)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Prenda));
}

// Obtener prendas de un vendedor
export async function getMisPrendas(vendedoraId: string): Promise<Prenda[]> {
  const q = query(
    collection(db, "prendas"),
    where("vendedoraId", "==", vendedoraId),
    orderBy("creadaEn", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Prenda));
}

// Obtener prenda por ID
export async function getPrendaById(id: string): Promise<Prenda | null> {
  const snap = await getDoc(doc(db, "prendas", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Prenda;
}

// Marcar como vendida
export async function marcarVendida(id: string) {
  await updateDoc(doc(db, "prendas", id), { vendida: true });
}

// Dar/quitar like
export async function toggleLike(prendaId: string, increment: 1 | -1) {
  const ref = doc(db, "prendas", prendaId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const current = snap.data().likes ?? 0;
    await updateDoc(ref, { likes: current + increment });
  }
}
