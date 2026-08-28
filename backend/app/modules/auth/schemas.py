"""
Schemas de Pydantic: validan lo que entra (requests) y dan forma a lo que sale (responses).
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr

from .models import RolEnum


class UsuarioBase(BaseModel):
    email: EmailStr


class UsuarioCreate(UsuarioBase):
    password: str
    rol: RolEnum = RolEnum.operario


class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str


class UsuarioOut(UsuarioBase):
    id: int
    rol: RolEnum
    created_at: datetime

    class Config:
        from_attributes = True  # permite convertir el modelo SQLAlchemy directamente


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioOut


class AuditoriaLogOut(BaseModel):
    id: int
    usuario_id: Optional[int] = None
    email: Optional[str] = None
    accion: str
    detalles: Optional[str] = None
    ip_address: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
