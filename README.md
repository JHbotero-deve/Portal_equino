# GAVAC — Sistema de Registro de Ganado

Proyecto final ADSO — SENA CTMA (ficha 3223874).

## Stack del proyecto

- **Front-end:** HTML + TypeScript + Tailwind CSS
- **Back-end:** Python (FastAPI)
- **Base de datos:** SQL Server (por ahora, SQLite local mientras se termina de configurar SQL Server)

## Equipo

| Integrante | Módulo | Carpeta backend | Carpeta frontend |
|---|---|---|---|
| Oscar (líder) | Registro de ganado + coordinación | `backend/app/modules/cattle` | `frontend/src/modules/ganado` |
| Juan Herrera | Usuarios y autenticación | `backend/app/modules/auth` | `frontend/src/modules/auth` |
| Jorge Botero | Consultas y reportes | `backend/app/modules/reportes` | `frontend/src/modules/reportes` |
| Elian Martínez | Base de datos y documentación final | — (define el modelo real en SQL Server) | — |

## Estructura del repositorio

```
gavac/
├── backend/                  # API en Python (FastAPI)
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── main.py           # Punto de entrada, une todos los módulos
│       ├── database.py       # Conexión a la base de datos (compartida)
│       └── modules/
│           ├── cattle/       # Oscar
│           ├── auth/         # Juan
│           └── reportes/     # Jorge
├── frontend/                 # HTML + TypeScript + Tailwind
│   ├── index.html
│   ├── tsconfig.json
│   └── src/
│       ├── shared/           # Código común entre módulos
│       └── modules/
│           ├── ganado/       # Oscar
│           ├── auth/         # Juan
│           └── reportes/     # Jorge
├── docs/sections/            # Guía de trabajo del repositorio
└── .github/                  # Plantillas de PR e issues
```

Cada módulo de `backend/app/modules/` y `frontend/src/modules/` sigue
el mismo patrón interno. Entra a la carpeta de tu módulo — cada una
tiene su propio `README.md` con los pasos exactos para empezar.

## Cómo correr el proyecto localmente

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # En Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Documentación interactiva de la API: http://localhost:5432/docs

### Frontend
```bash
cd frontend
npm install
npx tsc
```
Luego abre `index.html` en el navegador (o usa la extensión Live Server de VS Code).

## Reglas de trabajo en equipo

1. **Cada quien trabaja solo dentro de su carpeta de módulo.** Si necesitas algo de otro módulo (ej. Jorge necesita el modelo `Animal` de Oscar), impórtalo, pero no lo modifiques sin avisar.
2. **La base de datos la controla Elian.** Nadie más cambia el modelo de datos en SQL Server directamente.
3. **Cada rama de Git se llama `feature/<módulo>`** (ej. `feature/auth`, `feature/reportes`). Los cambios se suben por Pull Request.
4. **`backend/app/main.py` y `backend/app/database.py` son compartidos** — cualquier cambio ahí se avisa al equipo antes de hacer commit.
5. Mientras SQL Server no esté listo, todos pueden trabajar con SQLite local (ver `.env.example`) sin bloquearse entre sí.
