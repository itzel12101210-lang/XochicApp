// app/api/upload/route.ts
// API route que firma el upload del lado del servidor usando las credenciales de Cloudinary
// Asi el API secret nunca se expone al cliente
import { NextRequest, NextResponse } from "next/server";

const CLOUD_NAME   = process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY      = process.env.CLOUDINARY_API_KEY;
const API_SECRET   = process.env.CLOUDINARY_API_SECRET;

export async function POST(req: NextRequest) {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary no configurado. Agrega CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET al .env.local" },
      { status: 500 }
    );
  }

  try {
    const formData  = await req.formData();
    const file      = formData.get("file") as File;
    const folder    = (formData.get("folder") as string) ?? "xochic/prendas";

    if (!file) return NextResponse.json({ error: "No se recibio archivo" }, { status: 400 });

    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    // Generar firma HMAC-SHA1
    const encoder   = new TextEncoder();
    const keyData   = encoder.encode(API_SECRET);
    const msgData   = encoder.encode(paramsToSign);
    const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
    const sigBuf    = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
    const signature = Array.from(new Uint8Array(sigBuf)).map(b => b.toString(16).padStart(2, "0")).join("");

    // Subir a Cloudinary con firma
    const uploadForm = new FormData();
    uploadForm.append("file",      file);
    uploadForm.append("api_key",   API_KEY);
    uploadForm.append("timestamp", String(timestamp));
    uploadForm.append("signature", signature);
    uploadForm.append("folder",    folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body:   uploadForm,
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.error?.message ?? "Error en Cloudinary" }, { status: 400 });
    }

    const data = await res.json();
    return NextResponse.json({ url: data.secure_url, publicId: data.public_id });

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
