const API_BASE = "/api/auth";

export interface UsuarioCreate {
  email: string;
  password: string;
}

export interface UsuarioLogin {
  email: string;
  password: string;
}

export interface UsuarioOut {
  id: number;
  email: string;
  rol: string;
  created_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  usuario: UsuarioOut;
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) {
      return data.detail.map((d: any) => d.msg).join(", ");
    }
    return "Ocurrio un error inesperado.";
  } catch {
    return "Ocurrio un error inesperado.";
  }
}

export async function registrar(datos: UsuarioCreate): Promise<UsuarioOut> {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export async function login(datos: UsuarioLogin): Promise<Token> {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}
