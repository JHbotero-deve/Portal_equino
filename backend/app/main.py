from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from starlette.responses import Response
from starlette.staticfiles import StaticFiles as _StaticFiles

import os

from app.database import Base, engine
from app.middleware.security import SecurityHeadersMiddleware

# ============================================
# ROUTERS
# ============================================

from app.modules.cattle.router import router as cattle_router
from app.modules.auth.router import router as auth_router
from app.modules.reportes.router import router as reportes_router


# ============================================
# APP
# ============================================

app = FastAPI(
    title="GAVAC API",
    description="Sistema de Gestión Ganadera Profesional - Estado Auditable",
    version="1.0.0"
)


# ============================================
# BASE DE DATOS
# ============================================

try:
    Base.metadata.create_all(bind=engine)
    print("✅ Conexión a Base de Datos exitosa.")
except Exception as e:
    print(f"❌ Error DB: {e}")


# ============================================
# CORS
# ============================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5432",
        "http://localhost:5432",
        "http://127.0.0.1:5432",
        "http://localhost:5432",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# SEGURIDAD
# ============================================

app.add_middleware(SecurityHeadersMiddleware)


# ============================================
# UBICACIÓN DEL FRONTEND
# ============================================

current_file_dir = os.path.dirname(os.path.abspath(__file__))

# backend/app
#      ↓
# backend
#      ↓
# GAVAC
root_dir = os.path.normpath(
    os.path.join(current_file_dir, "..", "..")
)

frontend_dir = os.path.join(
    root_dir,
    "frontend"
)

print("📁 Frontend:", frontend_dir)


# ============================================
# STATIC FILES
# ============================================

class NoCacheStaticFiles(_StaticFiles):

    async def get_response(
        self,
        path: str,
        scope
    ) -> Response:

        response = await super().get_response(
            path,
            scope
        )

        response.headers[
            "Cache-Control"
        ] = "no-store, no-cache, must-revalidate, max-age=0"

        return response


if os.path.exists(frontend_dir):

    app.mount(
        "/static",
        NoCacheStaticFiles(
            directory=frontend_dir
        ),
        name="static"
    )

    print("✅ Frontend encontrado.")

else:

    print(
        f"❌ No se encontró el frontend: {frontend_dir}"
    )


# ============================================
# PÁGINA PRINCIPAL
# ============================================

@app.get("/")
def root():

    return RedirectResponse(
        url="/login"
    )


# ============================================
# LOGIN
# ============================================

@app.get("/login")
def login_page():

    return FileResponse(
        os.path.join(
            frontend_dir,
            "src",
            "modules",
            "auth",
            "index.html"
        )
    )


# ============================================
# GANADO
# ============================================

@app.get("/ganado")
def ganado_page():

    return FileResponse(
        os.path.join(
            frontend_dir,
            "src",
            "modules",
            "ganado",
            "index.html"
        )
    )


# ============================================
# REPORTES
# ============================================

@app.get("/reportes")
def reportes_page():

    return FileResponse(
        os.path.join(
            frontend_dir,
            "src",
            "modules",
            "reportes",
            "index.html"
        )
    )


# ============================================
# API
# ============================================

app.include_router(
    cattle_router
)

app.include_router(
    auth_router
)

app.include_router(
    reportes_router
)


# ============================================
# HEALTH CHECK
# ============================================

@app.get("/health")
def health():

    return {
        "status": "ok",
        "message": "GAVAC API is running"
    }