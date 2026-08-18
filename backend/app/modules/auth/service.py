import os
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.database import get_db

from . import repository, schemas

SECRET_KEY = os.getenv("AUTH_SECRET_KEY", "cambia-esta-clave-en-.env")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verificar_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def crear_token(usuario_id: int, rol: str) -> str:
    expira = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(usuario_id), "rol": rol, "exp": expira}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def registrar_usuario(db: Session, datos: schemas.UsuarioCreate):
    existente = repository.get_usuario_by_email(db, datos.email)
    if existente:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    password_hash = hash_password(datos.password)
    return repository.crear_usuario(db, datos.email, password_hash, datos.rol)


def autenticar_usuario(db: Session, datos: schemas.UsuarioLogin):
    usuario = repository.get_usuario_by_email(db, datos.email)
    if not usuario or not verificar_password(datos.password, usuario.password_hash):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    token = crear_token(usuario.id, usuario.rol.value)
    return token, usuario


def get_usuario_actual(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credenciales_invalidas = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar la credencial",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        usuario_id = payload.get("sub")
        if usuario_id is None:
            raise credenciales_invalidas
    except JWTError:
        raise credenciales_invalidas

    usuario = repository.get_usuario_by_id(db, int(usuario_id))
    if usuario is None:
        raise credenciales_invalidas
    return usuario


def requerir_rol(*roles_permitidos: str):
    def verificador(usuario=Depends(get_usuario_actual)):
        if usuario.rol not in roles_permitidos:
            raise HTTPException(
                status_code=403, detail="No tienes permisos para esta acción"
            )
        return usuario

    return verificador