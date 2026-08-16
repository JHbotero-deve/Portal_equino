"""
Configuración de la base de datos.

HOY: usamos SQLite (un archivo local, sin necesidad de servidor) para que
puedas programar y probar tu módulo sin depender de que el compañero de
base de datos termine SQL Server.

CUANDO SQL Server esté listo: solo cambias la variable de entorno
DATABASE_URL (ver .env.example) y NO tocas ni una línea de código de
models/repositories/services. SQLAlchemy se encarga de hablar con
cualquiera de las dos bases de datos de la misma forma.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Por defecto: SQLite local (archivo gavac.db en esta carpeta).
# Para SQL Server más adelante, la URL se ve algo así (ejemplo):
#   mssql+pyodbc://usuario:clave@servidor/GAVAC?driver=ODBC+Driver+17+for+SQL+Server
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./gavac.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependencia de FastAPI: entrega una sesión de BD y la cierra al terminar."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
