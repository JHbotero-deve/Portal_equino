from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.middleware.security import SecurityHeadersMiddleware
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

# Middleware de cabeceras de seguridad (equivalente a Helmet)
app.add_middleware(SecurityHeadersMiddleware)

app.include_router(reportes_router)


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    JWT_SECRET = "mi-secreto-de-prueba"
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
