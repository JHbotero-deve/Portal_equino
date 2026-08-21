from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import os

from app.database import Base, engine

# ============================================================
# IMPORTAR MODELOS
# ============================================================
# Estos imports son OBLIGATORIOS antes de create_all() 
# para que SQLAlchemy registre las tablas en Supabase.
from app.modules.auth.models import Usuario
from app.modules.cattle.models import Animal

# ============================================================
# IMPORTAR ROUTERS
# ============================================================
from app.modules.cattle.router import router as cattle_router

# ============================================================
# CREAR APLICACIÓN FASTAPI
# ============================================================
app = FastAPI(
    title="GAVAC API",
    version="0.1.0",
    description="API para el sistema de registro de ganado conectado a Supabase"
)

# ============================================================
# CONFIGURACIÓN CORS (Permite que el frontend hable con el backend)
# ============================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite cualquier origen (ideal para desarrollo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# CREAR TABLAS EN LA BASE DE DATOS
# ============================================================
# SQLAlchemy verificará Supabase y creará las tablas 'usuarios' y 'animales' 
# si no existen todavía.
try:
    Base.metadata.create_all(bind=engine)
    print("✅ Tablas verificadas/creadas exitosamente en la base de datos.")
except Exception as e:
    print(f"❌ Error al conectar con la base de datos: {e}")

# ============================================================
# CONFIGURACIÓN DEL FRONTEND
# ============================================================
frontend_dir = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../frontend"
    )
)

# ============================================================
# ARCHIVOS ESTÁTICOS
# ============================================================
app.mount(
    "/static",
    StaticFiles(directory=frontend_dir),
    name="static"
)

# ============================================================
# PÁGINAS (Rutas que sirven el HTML)
# ============================================================
@app.get("/")
def index_page():
    return FileResponse(os.path.join(frontend_dir, "index.html"))

@app.get("/ganado")
def ganado_page():
    return FileResponse(os.path.join(frontend_dir, "ganado.html"))

# ============================================================
# INCLUIR RUTAS DE LA API
# ============================================================
app.include_router(cattle_router)

# ============================================================
# HEALTH CHECK (Para verificar que todo está vivo)
# ============================================================
@app.get("/health")
def health():
    return {
        "status": "ok",
        "database": "PostgreSQL (Supabase)",
        "message": "El backend está corriendo y conectado"
    }