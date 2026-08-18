from app.modules.cattle.router import router as cattle_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Cuando Juan termine su módulo, descomenta esta línea:
# from app.modules.auth.router import router as auth_router

# Cuando Jorge termine el suyo, descomenta esta línea:
# from app.modules.reportes.router import router as reportes_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GAVAC API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    # en producción, restringir al dominio real del frontend
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cattle_router)
# app.include_router(auth_router)
# app.include_router(reportes_router)


@app.get("/health")
def health():
    return {"status": "ok"}