from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.middleware.security import SecurityHeadersMiddleware
from app.modules.cattle.router import router as cattle_router
from app.modules.auth.router import router as auth_router
from app.modules.reportes.router import router as reportes_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GAVAC API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    # en producción, restringir al dominio real del frontend
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SecurityHeadersMiddleware)

app.include_router(cattle_router)
app.include_router(auth_router)
app.include_router(reportes_router)


@app.get("/")
def home():
    return {
        "message": "Bienvenido a la API de GAVAC",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
def health():
    from app.database import DATABASE_URL
    db_type = "SQL Server" if "mssql" in DATABASE_URL.lower() else "SQLite"
    return {
        "status": "ok",
        "database": db_type,
        "url_info": "192.168.1.8" if db_type == "SQL Server" else "local"
    }
