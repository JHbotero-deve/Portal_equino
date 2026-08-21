from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import os

from app.database import Base, engine

# ============================================================
# IMPORTAR MODELOS
# ============================================================
# Estos imports permiten que SQLAlchemy registre los modelos
# antes de ejecutar Base.metadata.create_all().
from app.modules.auth.models import Usuario
from app.modules.cattle.models import Animal

# ============================================================
# IMPORTAR ROUTERS
# ============================================================

from app.modules.cattle.router import router as cattle_router
from app.modules.auth.router import router as auth_router
from app.modules.reportes.router import router as reportes_router


# ============================================================
# CREAR APLICACIÓN FASTAPI
# ============================================================

app = FastAPI(
    title="GAVAC API",
    version="0.1.0"
)


# ============================================================
# CREAR TABLAS
# ============================================================
# SQLAlchemy crea las tablas de los modelos registrados
# que todavía no existan en PostgreSQL.

Base.metadata.create_all(bind=engine)


# ============================================================
# CONFIGURACIÓN CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
# PÁGINA PRINCIPAL
# ============================================================

@app.get("/")
def index_page():

    return FileResponse(
        os.path.join(
            frontend_dir,
            "index.html"
        )
    )


# ============================================================
# PÁGINA DE REPORTES
# ============================================================

@app.get("/reportes")
def reportes_page():
    return FileResponse(
        os.path.join(
            frontend_dir,
            "reportes.html"
        )
    )


# ============================================================
# RUTAS DE LOS MÓDULOS
# ============================================================

app.include_router(cattle_router)
app.include_router(auth_router)
app.include_router(reportes_router)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "ok",
        "database": "PostgreSQL"
    }