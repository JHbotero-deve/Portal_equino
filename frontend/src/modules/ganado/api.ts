const API_BASE = "http://127.0.0.1:8000/api/ganado";

export type Sexo = "macho" | "hembra";
export type Estado = "active" | "inactive" | "sold" | "deceased";

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

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("gavac_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (Array.isArray(body.detail)) {
      return body.detail.map((d: any) => d.msg).join(", ");
    }
    return body.detail ?? "Ocurrio un error inesperado.";
  } catch {
    return "Ocurrio un error inesperado.";
  }
}

export async function checkApiHealth(): Promise<any> {
  const res = await fetch("http://127.0.0.1:8000/health");
  if (!res.ok) throw new Error("API fuera de linea");
  return res.json();
}

export async function listarAnimales(filtros: Filtros = {}): Promise<Animal[]> {
  const params = new URLSearchParams();
  if (filtros.tag) params.set("tag", filtros.tag);
  if (filtros.breed) params.set("breed", filtros.breed);

  const res = await fetch(`${API_BASE}/?${params.toString()}`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.json();
}

export async function registrarAnimal(data: AnimalInput): Promise<Animal> {
  const res = await fetch(`${API_BASE}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.json();
}

export async function eliminarAnimal(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
}
