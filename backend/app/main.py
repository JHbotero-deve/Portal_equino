import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from starlette.responses import Response
from starlette.staticfiles import StaticFiles as _StaticFiles

from app.database import Base, engine
from app.middleware.security import SecurityHeadersMiddleware
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
except Exception:
    pass # Managed by health check or initial startup logs

# ============================================
# MIDDLEWARES
# ============================================

# Security Headers (Production Ready)
app.add_middleware(SecurityHeadersMiddleware)

# CORS Configuration
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

current_file_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.normpath(os.path.join(current_file_dir, "..", ".."))
frontend_dir = os.path.join(root_dir, "frontend")

if os.path.exists(frontend_dir):
    app.mount("/static", NoCacheStaticFiles(directory=frontend_dir), name="static")

# ============================================
# PUBLIC ROUTES (PAGES)
# ============================================

@app.get("/")
def root():
    return RedirectResponse(url="/login")

@app.get("/login")
def login_page():
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
        "message": "GAVAC API is running"
    }
