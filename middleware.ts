import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas publicas (no requieren auth)
const PUBLIC_PATHS = ["/bienvenida", "/login", "/registro", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Siempre permitir rutas publicas y archivos estaticos
  if (
    PUBLIC_PATHS.some(p => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Verificar cookie de sesion de Firebase (se setea desde el cliente)
  const session = request.cookies.get("xochic-session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/bienvenida", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
