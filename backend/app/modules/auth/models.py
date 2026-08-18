"""
Modelo SQLAlchemy: tabla de usuarios.

IMPORTANTE: este archivo importa `Base` desde app.database.
Si en tu database.py la clase base tiene otro nombre, ajusta el import.
"""

import enum

from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.sql import func

from app.database import Base


class RolEnum(str, enum.Enum):
    admin = "admin"
    operario = "operario"


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    rol = Column(Enum(RolEnum), default=RolEnum.operario, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
