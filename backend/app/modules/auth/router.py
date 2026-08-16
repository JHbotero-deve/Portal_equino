from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from . import schemas, service

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])


@router.post("/register", response_model=schemas.UsuarioOut, status_code=201)
def register(datos: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return service.registrar_usuario(db, datos)


@router.post("/login", response_model=schemas.Token)
def login(datos: schemas.UsuarioLogin, db: Session = Depends(get_db)):
    token, usuario = service.autenticar_usuario(db, datos)
    return schemas.Token(access_token=token, usuario=usuario)


@router.get("/me", response_model=schemas.UsuarioOut)
def me(usuario_actual=Depends(service.get_usuario_actual)):
    return usuario_actual


@router.get("/solo-admin")
def solo_admin(usuario=Depends(service.requerir_rol("admin"))):
    return {"mensaje": f"Bienvenido admin {usuario.email}"}