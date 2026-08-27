// ============================================
// API GAVAC - GANADO
// Frontend -> FastAPI -> PostgreSQL/Supabase
// ============================================

const API_BASE = "http://127.0.0.1:8000/api/ganado";
const API_HEALTH = "http://127.0.0.1:8000/health";

// ============================================
// TIPOS
// ============================================

export type Sexo = "macho" | "hembra";

export type Estado =
  | "active"
  | "inactive"
  | "sold"
  | "deceased";

export interface Animal {
  id: number;
  tag: string;
  breed: string | null;
  sex: Sexo | null;
  birth_date: string | null;
  status: Estado;
  created_at: string;
  updated_at: string;
}

export interface AnimalInput {
  tag: string;
  breed?: string;
  sex?: Sexo;
  birth_date?: string;
}

export interface Filtros {
  tag?: string;
  breed?: string;
}

// ============================================
// TOKEN
// ============================================

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("gavac_token");

  console.log(
    "Token encontrado:",
    token ? "SÍ" : "NO"
  );

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

// ============================================
// ERRORES
// ============================================

async function parseErrorMessage(
  res: Response
): Promise<string> {
  try {
    const body = await res.json();

    if (Array.isArray(body.detail)) {
      return body.detail
        .map((error: any) =>
          error.msg || "Error de validación"
        )
        .join(", ");
    }

    if (body.detail) {
      return String(body.detail);
    }

    if (body.message) {
      return String(body.message);
    }

    return `Error HTTP ${res.status}`;
  } catch {
    return `Error HTTP ${res.status}: ${res.statusText}`;
  }
}

// ============================================
// HEALTH CHECK
// ============================================

export async function checkApiHealth(): Promise<any> {
  console.log("Comprobando FastAPI...");

  const res = await fetch(API_HEALTH, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  console.log(
    "Respuesta /health:",
    res.status
  );

  if (!res.ok) {
    throw new Error(
      await parseErrorMessage(res)
    );
  }

  const data = await res.json();

  console.log(
    "Estado de API:",
    data
  );

  return data;
}

// ============================================
// LISTAR ANIMALES
// ============================================

export async function listarAnimales(
  filtros: Filtros = {}
): Promise<Animal[]> {

  const params = new URLSearchParams();

  if (filtros.tag) {
    params.set("tag", filtros.tag);
  }

  if (filtros.breed) {
    params.set("breed", filtros.breed);
  }

  const query = params.toString();

  const url = query
    ? `${API_BASE}/?${query}`
    : `${API_BASE}/`;

  console.log("==============================");
  console.log("GET GANADO");
  console.log("URL:", url);

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...authHeaders(),
  };

  console.log(
    "Authorization:",
    headers["Authorization"]
      ? "Bearer TOKEN"
      : "NO HAY TOKEN"
  );

  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    console.log(
      "Respuesta GET ganado:",
      res.status
    );

    if (!res.ok) {

      const message =
        await parseErrorMessage(res);

      console.error(
        "Error del backend:",
        message
      );

      // Token inválido o inexistente
      if (
        res.status === 401 ||
        message === "Not authenticated"
      ) {
        localStorage.removeItem("gavac_token");
        localStorage.removeItem("gavac_usuario");

        alert(
          "Tu sesión no es válida. Debes iniciar sesión nuevamente."
        );

        // Redirigimos a la página de login organizada
        window.location.href = "/login";

        return [];
      }

      throw new Error(message);
    }

    const data = await res.json();

    console.log(
      "Animales recibidos:",
      data
    );

    if (!Array.isArray(data)) {
      throw new Error(
        "La API no devolvió una lista de animales."
      );
    }

    return data as Animal[];

  } catch (error) {

    console.error(
      "Error listando animales:",
      error
    );

    throw error;
  }
}

// ============================================
// REGISTRAR ANIMAL
// ============================================

export async function registrarAnimal(
  data: AnimalInput
): Promise<Animal> {

  console.log(
    "Registrando animal:",
    data
  );

  const res = await fetch(
    `${API_BASE}/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeaders(),
      },

      body: JSON.stringify(data),
    }
  );

  console.log(
    "Respuesta POST ganado:",
    res.status
  );

  if (!res.ok) {

    const message =
      await parseErrorMessage(res);

    console.error(
      "Error registrando animal:",
      message
    );

    throw new Error(message);
  }

  const animal = await res.json();

  console.log(
    "Animal registrado:",
    animal
  );

  return animal as Animal;
}

// ============================================
// ELIMINAR ANIMAL
// ============================================

export async function eliminarAnimal(
  id: number
): Promise<void> {

  console.log(
    "Eliminando animal:",
    id
  );

  const res = await fetch(
    `${API_BASE}/${id}`,
    {
      method: "DELETE",

      headers: {
        Accept: "application/json",
        ...authHeaders(),
      },
    }
  );

  console.log(
    "Respuesta DELETE:",
    res.status
  );

  if (!res.ok) {

    const message =
      await parseErrorMessage(res);

    console.error(
      "Error eliminando animal:",
      message
    );

    throw new Error(message);
  }

  console.log(
    "Animal eliminado correctamente."
  );
}
