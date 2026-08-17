# Módulo `reportes` (frontend) — Consultas y reportes

**Responsable:** Jorge Botero

Sigue el mismo patrón del módulo `ganado` (carpeta hermana):

```
reportes/
├── api.ts     # Funciones fetch() hacia http://localhost:8000/api/reportes/...
└── main.ts    # Lógica de la tabla/gráficas y manejo del DOM
```

## Pasos para empezar

1. Mira `../ganado/api.ts` y `../ganado/main.ts` como ejemplo.
2. Crea tu propia página HTML (`reportes.html` en la raíz de `frontend/`) usando Tailwind igual que `index.html`.
3. En el `<script>` final de tu HTML, apunta a `./dist/modules/reportes/main.js` (una vez compilado).
4. Corre `npx tsc` desde `frontend/` para compilar tu TypeScript junto con el resto.

## Dudas de arranque
- El backend de reportes debe estar corriendo en `http://localhost:8000/api/reportes/...` (eso lo hace Jorge en el backend).
- No modifiques archivos dentro de `../ganado/` — si necesitas compartir algo (ej. una función de utilidad), ponla en `../../shared/`.
