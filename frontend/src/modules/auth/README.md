# Módulo `auth` (frontend) — Login y gestión de usuarios

**Responsable:** Juan Herrera

Sigue el mismo patrón del módulo `ganado` (carpeta hermana):

```
auth/
├── api.ts     # Funciones fetch() hacia http://localhost:8000/api/auth/...
└── main.ts    # Lógica del formulario de login y manejo del DOM
```

## Pasos para empezar

1. Mira `../ganado/api.ts` como ejemplo de cómo estructurar las llamadas `fetch`.
2. Crea tu propia página HTML (`login.html` en la raíz de `frontend/`) que use Tailwind igual que `index.html`.
3. En el `<script>` final de tu HTML, apunta a `./dist/modules/auth/main.js` (una vez compilado).
4. Corre `npx tsc` desde `frontend/` para compilar tu TypeScript junto con el resto.

## Dudas de arranque
- El backend de auth debe estar corriendo en `http://localhost:8000/api/auth/...` (eso lo hace Juan en el backend).
- No modifiques archivos dentro de `../ganado/` — si necesitas compartir algo (ej. una función de utilidad), ponla en `../../shared/`.
