"""
Configuración de la base de datos de GAVAC.

La conexión se obtiene desde la variable DATABASE_URL
definida en el archivo .env.

Actualmente utilizamos SQL Server mediante SQLAlchemy + PyODBC.
"""

import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# ============================================================
# CARGAR VARIABLES DEL ARCHIVO .env
# ============================================================

load_dotenv()


# ============================================================
# OBTENER URL DE LA BASE DE DATOS
# ============================================================

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "No se encontró DATABASE_URL en el archivo .env"
    )


# ============================================================
# CONFIGURAR CONEXIÓN
# ============================================================

# SQLite necesita check_same_thread.
# SQL Server no necesita este parámetro.
connect_args = {}

if DATABASE_URL.startswith("sqlite"):
    connect_args = {
        "check_same_thread": False
    }


engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)


# ============================================================
# SESIONES
# ============================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# ============================================================
# BASE PARA LOS MODELOS
# ============================================================

Base = declarative_base()


# ============================================================
# DEPENDENCIA PARA FASTAPI
# ============================================================

def get_db():
    """
    Crea una sesión de base de datos para una petición
    y la cierra automáticamente al finalizar.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()