// lib/cloudinary.ts
// Sube una imagen a Cloudinary usando un upload preset "unsigned"
// (no requiere API secret en el frontend)

export interface CloudinaryResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadImage(
  file: File,
  folder = "xochic/prendas"
): Promise<CloudinaryResult> {
  const cloudName   = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "xochic_unsigned";

  if (!cloudName) throw new Error("Falta NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME en .env.local");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Error al subir imagen a Cloudinary");
  }

  return res.json();
}

// Genera URL optimizada con transformaciones
export function cloudinaryUrl(
  publicId: string,
  opts: { width?: number; height?: number; quality?: number } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { width = 600, height, quality = 80 } = opts;
  const transforms = [
    `w_${width}`,
    height ? `h_${height}` : "",
    `q_${quality}`,
    "f_auto",
    "c_fill",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`;
}
