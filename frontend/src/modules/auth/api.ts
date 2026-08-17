const API_BASE = "http://localhost:8000/api/auth";

export interface UsuarioOut {
  id: number;
  email: string;
  rol: "admin" | "operario";
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  usuario: UsuarioOut;
}

async function manejarError(res: Response, mensajePorDefecto: string): Promise<never> {
  const cuerpo = await res.json().catch(() => null);
  const detalle = cuerpo && typeof cuerpo.detail === "string" ? cuerpo.detail : mensajePorDefecto;
  throw new Error(detalle);
}

export async function login(email: string, password: string): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) return manejarError(res, "Error al iniciar sesión");
  return res.json();
}

export async function registrar(
  email: string,
  password: string,
  rol: "admin" | "operario" = "operario"
): Promise<UsuarioOut> {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rol }),
  });
  if (!res.ok) return manejarError(res, "Error al registrar usuario");
  return res.json();
}

export async function obtenerUsuarioActual(): Promise<UsuarioOut> {
  const token = localStorage.getItem("gavac_token");
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token ?? ""}` },
  });
  if (!res.ok) return manejarError(res, "No se pudo obtener el usuario actual");
  return res.json();
}

export function guardarSesion(data: TokenResponse): void {
  localStorage.setItem("gavac_token", data.access_token);
  localStorage.setItem("gavac_usuario", JSON.stringify(data.usuario));
}

export function obtenerUsuarioGuardado(): UsuarioOut | null {
  const raw = localStorage.getItem("gavac_usuario");
  return raw ? (JSON.parse(raw) as UsuarioOut) : null;
}

export function cerrarSesion(): void {
  localStorage.removeItem("gavac_token");
  localStorage.removeItem("gavac_usuario");
}

export function estaAutenticado(): boolean {
  return Boolean(localStorage.getItem("gavac_token"));
}