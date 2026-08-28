import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from starlette.responses import Response
from starlette.staticfiles import StaticFiles as _StaticFiles

from app.database import Base, engine
from app.modules.cattle.router import router as cattle_router
from app.modules.auth.router import router as auth_router
from app.modules.reportes.router import router as reportes_router

# ============================================
# APP CONFIGURATION
# ============================================

app = FastAPI(
    title="GAVAC API",
    description="Sistema de Gestión Ganadera Profesional - Estado Auditable",
    version="1.0.0"
)

# ============================================
# DATABASE INITIALIZATION
# ============================================

try:
    Base.metadata.create_all(bind=engine)
    print("✅ Conexión a Base de Datos exitosa.")
except Exception as e:
    print(f"❌ Error DB: {e}")

# ============================================
# MIDDLEWARES
# ============================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# STATIC FILES & FRONTEND MAPPING
# ============================================

class NoCacheStaticFiles(_StaticFiles):
    async def get_response(self, path: str, scope) -> Response:
        response = await super().get_response(path, scope)
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        return response

# Determinar ruta del frontend relativa a la raíz del proyecto
current_file_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.normpath(os.path.join(current_file_dir, "..", ".."))
frontend_dir = os.path.join(root_dir, "frontend")

if os.path.exists(frontend_dir):
    app.mount("/static", NoCacheStaticFiles(directory=frontend_dir), name="static")
    print(f"✅ Frontend montado desde: {frontend_dir}")
else:
    print(f"⚠️ Advertencia: No se encontró el directorio frontend en {frontend_dir}")

# ============================================
# PUBLIC ROUTES (PAGES)
# ============================================

@app.get("/")
def root():
    return RedirectResponse(url="/login")

@app.get("/login")
def login_page():
    # El archivo principal de login está en la raíz del frontend o en su módulo
    path = os.path.join(frontend_dir, "index.html")
    if os.path.exists(path):
        return FileResponse(path)
    return FileResponse(os.path.join(frontend_dir, "src", "modules", "auth", "index.html"))

@app.get("/ganado")
def ganado_page():
    return FileResponse(os.path.join(frontend_dir, "src", "modules", "ganado", "index.html"))

@app.get("/reportes")
def reportes_page():
    return FileResponse(os.path.join(frontend_dir, "src", "modules", "reportes", "index.html"))

# ============================================
# API ROUTERS
# ============================================

app.include_router(cattle_router)
app.include_router(auth_router)
app.include_router(reportes_router)

# ============================================
# HEALTH CHECK
# ============================================

@app.get("/health")
def health():
    return {
        "status": "ok",
        "database": "connected" if engine else "disconnected",
        "message": "GAVAC API is running"
    }
