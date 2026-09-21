// lib/upload.ts
// Sube imagenes a Cloudinary a traves de nuestra API route (firmado server-side)
// No requiere upload preset ni plan especial de Firebase

export interface UploadResult {
  url: string;
  publicId: string;
  path: string; // alias de publicId para compatibilidad
}

export async function uploadFile(
  file: File,
  folder = "xochic/prendas",
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file",   file);
  formData.append("folder", folder);

  // Simular progreso (fetch no tiene progreso nativo)
  onProgress?.(30);

  const res = await fetch("/api/upload", { method: "POST", body: formData });

  onProgress?.(90);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Error al subir imagen");
  }

  const data = await res.json();
  onProgress?.(100);

  return { url: data.url, publicId: data.publicId, path: data.publicId };
}

export async function uploadFiles(
  files: File[],
  folder = "xochic/prendas",
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
