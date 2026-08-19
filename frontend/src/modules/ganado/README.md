# Módulo `ganado` (frontend) — Registro y consulta de ganado

**Responsable:** Oscar (líder)

```
ganado/
├── api.ts     # Funciones fetch() hacia http://localhost:8000/api/ganado/...
└── main.ts    # Lógica del formulario/tabla y manejo del DOM
```
locla
## Pasos para empezar

1. Crea `api.ts` con las funciones para listar, registrar, actualizar y eliminar animales (fetch hacia `/api/ganado`).
2. Crea `main.ts` con la lógica del formulario y la tabla en el DOM.
3. En el `index.html` de la raíz de `frontend/`, apunta el `<script>` final a `./dist/modules/ganado/main.js` (una vez compilado).
4. Corre `npx tsc` desde `frontend/` para compilar tu TypeScript junto con el resto.

## Dudas de arranque
- El backend de ganado debe estar corriendo en `http://localhost:8000/api/ganado/...`.
- No modifiques archivos dentro de `../auth/` ni `../reportes/` — si necesitas compartir algo, ponlo en `../../shared/`.
