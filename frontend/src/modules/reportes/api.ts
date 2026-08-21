export interface Report {
  id: number;
  name: string;
  created_at: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const REPORTS_URL = "/api/reportes/";

/** Obtiene los reportes disponibles para el usuario autenticado. */
export async function getReports(accessToken: string): Promise<Report[]> {
  if (!accessToken) {
    throw new ApiError("No hay una sesión activa.", 401);
  }

  const response = await fetch(REPORTS_URL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    let message = "No fue posible cargar los reportes.";

    try {
      const body: unknown = await response.json();
      if (typeof body === "object" && body !== null && "detail" in body) {
        const detail = body.detail;
        if (typeof detail === "string") {
          message = detail;
        }
      }
    } catch {
      // La API puede responder sin JSON ante errores de infraestructura.
    }

    throw new ApiError(message, response.status);
  }

  return (await response.json()) as Report[];
}
