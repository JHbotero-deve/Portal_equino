// ============================================
// API DE AUTENTICACIÓN - GAVAC
// Frontend -> FastAPI
// ============================================

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

// ============================================
// MANEJO DE ERRORES
// ============================================

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data.detail)) {
      return data.detail
        .map((d: any) => d.msg || "Error de validación")
        .join(", ");
    }

    return `Error HTTP ${response.status}`;
  } catch {
    return `Error HTTP ${response.status}: ${response.statusText}`;
  }
}

// ============================================
// REGISTRAR USUARIO
// ============================================

export async function registrar(
  datos: UsuarioCreate
): Promise<UsuarioOut> {

  console.log("Registrando usuario:", datos.email);

  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(datos),
  });

  console.log("Respuesta register:", response.status);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const usuario = await response.json();

  console.log("Usuario registrado:", usuario);

  return usuario;
}

// ============================================
// LOGIN
// ============================================

export async function login(
  datos: UsuarioLogin
): Promise<Token> {

  console.log("Intentando iniciar sesión:", datos.email);

  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(datos),
  });

  console.log("Respuesta login:", response.status);

  if (!response.ok) {
    const error = await parseErrorMessage(response);

    console.error("Error login:", error);

    throw new Error(error);
  }

  const resultado = await response.json();

  console.log("Login exitoso:", resultado);

  return resultado as Token;
}
