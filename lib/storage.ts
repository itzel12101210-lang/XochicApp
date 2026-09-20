// lib/storage.ts
// Sube imagenes a Firebase Storage (ya esta configurado, no necesita preset)
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Sube un archivo a Firebase Storage con progreso opcional
 * @param file       El archivo a subir
 * @param folder     Carpeta destino, ej: "prendas/user123"
 * @param onProgress Callback con porcentaje 0-100
 */
export async function uploadFile(
  file: File,
  folder = "prendas",
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  const ext       = file.name.split(".").pop() ?? "jpg";
  const fileName  = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const storagePath = `${folder}/${fileName}`;
  const storageRef  = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    task.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        onProgress?.(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ url, path: storagePath });
      }
    );
  });
}

/**
 * Sube multiples archivos en paralelo
 */
export async function uploadFiles(
  files: File[],
  folder = "prendas",
  onProgress?: (pct: number) => void
): Promise<UploadResult[]> {
  let completed = 0;
  const results = await Promise.all(
    files.map((file) =>
      uploadFile(file, folder, () => {
        completed++;
        onProgress?.(Math.round((completed / files.length) * 100));
      })
    )
  );
  return results;
}

/**
 * Elimina un archivo de Storage por su path
 */
export async function deleteFile(path: string): Promise<void> {
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
}
