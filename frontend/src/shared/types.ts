// Tipos y utilidades compartidas entre módulos del frontend.
// Cada integrante puede agregar aquí tipos que varios módulos necesiten
// (ej. un tipo de respuesta de error común). No pongas aquí lógica de
// un solo módulo — eso va dentro de src/modules/<tu-módulo>/.

export interface ApiErrorResponse {
  detail: string;
}
