// Capa de acceso a la API. Toda llamada al backend pasa por aquí,
// así el resto del frontend no necesita saber las URLs exactas.

const API_BASE = "/api/ganado";

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

async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (Array.isArray(body.detail)) {
      // Errores de validación de FastAPI (422): lista de objetos
      return body.detail.map((d: any) => d.msg).join(", ");
    }
    return body.detail ?? "Ocurrió un error inesperado.";
  } catch {
    return "Ocurrió un error inesperado.";
  }
}

export async function checkApiHealth(): Promise<any> {
  const res = await fetch("/health");
  if (!res.ok) throw new Error("API fuera de línea");
  return res.json();
}

export async function listarAnimales(filtros: Filtros = {}): Promise<Animal[]> {
  const params = new URLSearchParams();
  if (filtros.tag) params.set("tag", filtros.tag);
  if (filtros.breed) params.set("breed", filtros.breed);

  const res = await fetch(`${API_BASE}/?${params.toString()}`);
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.json();
}

export async function registrarAnimal(data: AnimalInput): Promise<Animal> {
  const res = await fetch(`${API_BASE}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
  return res.json();
}

export async function eliminarAnimal(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await parseErrorMessage(res));
}
