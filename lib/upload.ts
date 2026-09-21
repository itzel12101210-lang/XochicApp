// lib/upload.ts — Supabase Storage
// Gratis: 1GB storage, sin configuracion extra, bucket publico
import { supabase, PRENDAS_BUCKET } from "@/lib/supabase";

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Sube un archivo a Supabase Storage y regresa la URL publica
 */
export async function uploadFile(
  file: File,
  folder = "general",
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  onProgress?.(20);

  // Nombre unico para evitar colisiones
  const ext      = file.name.split(".").pop() ?? "jpg";
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  onProgress?.(40);

  const { data, error } = await supabase.storage
    .from(PRENDAS_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw new Error(error.message);

  onProgress?.(90);

  // Obtener URL publica del bucket
  const { data: publicData } = supabase.storage
    .from(PRENDAS_BUCKET)
    .getPublicUrl(data.path);

  onProgress?.(100);

  return { url: publicData.publicUrl, path: data.path };
}

/**
 * Sube multiples archivos secuencialmente con progreso total
 */
export async function uploadFiles(
  files: File[],
  folder = "general",
  onProgress?: (pct: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  for (let i = 0; i < files.length; i++) {
    const result = await uploadFile(files[i], folder);
    results.push(result);
    onProgress?.(Math.round(((i + 1) / files.length) * 100));
  }
  return results;
}

/**
 * Elimina un archivo de Supabase Storage por su path
 */
export async function deleteFile(path: string): Promise<void> {
  const { error } = await supabase.storage.from(PRENDAS_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}
