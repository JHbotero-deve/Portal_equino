import os
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.database import get_db

from . import repository, schemas
from .audit_service import registrar_accion


# ============================================================
# CONFIGURACIÓN JWT
# ============================================================

SECRET_KEY = os.getenv(
    "AUTH_SECRET_KEY",
    "cambia-esta-clave-en-.env"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8


# ============================================================
# CONTRASEÑAS
# ============================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str) -> str:
    """
    Convierte una contraseña en un hash seguro.
    """

    # bcrypt solo acepta hasta 72 bytes.
    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        raise HTTPException(
            status_code=400,
            detail="La contraseña no puede superar los 72 caracteres."
        )

    return pwd_context.hash(password)


def verificar_password(
    password: str,
    password_hash: str
) -> bool:
    """
    Verifica que la contraseña coincida con el hash almacenado.
    """

    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        return False

    return pwd_context.verify(
        password,
        password_hash
    )


# ============================================================
# OAUTH2
# ============================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


# ============================================================
# JWT
# ============================================================

def crear_token(
    usuario_id: int,
    rol: str
) -> str:

    expira = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(usuario_id),
        "rol": rol,
        "exp": expira
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ============================================================
# REGISTRO
# ============================================================

def registrar_usuario(
    db: Session,
    datos: schemas.UsuarioCreate,
    ip_address: str = None
):

    existente = repository.get_usuario_by_email(
        db,
        datos.email
    )

    if existente:
        raise HTTPException(
            status_code=400,
            detail="El email ya está registrado"
        )

    password_hash = hash_password(
        datos.password
    )

    usuario = repository.crear_usuario(
        db,
        datos.email,
        password_hash,
        datos.rol
    )

    registrar_accion(
        db,
        accion="REGISTRO_USUARIO",
        usuario_id=usuario.id,
        email=usuario.email,
        detalles=f"Nuevo usuario registrado con rol: {datos.rol}",
        ip=ip_address
    )

    return usuario


# ============================================================
# LOGIN
# ============================================================

def autenticar_usuario(
    db: Session,
    datos: schemas.UsuarioLogin,
    ip_address: str = None
):

    usuario = repository.get_usuario_by_email(
        db,
        datos.email
    )

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Email o contraseña incorrectos"
        )

    if not verificar_password(
        datos.password,
        usuario.password_hash
    ):
        # Opcional: registrar intento fallido
        registrar_accion(
            db,
            accion="LOGIN_FALLIDO",
            email=datos.email,
            detalles="Contraseña incorrecta",
            ip=ip_address
        )
        raise HTTPException(
            status_code=401,
            detail="Email o contraseña incorrectos"
        )

    token = crear_token(
        usuario.id,
        usuario.rol.value
    )

    registrar_accion(
        db,
        accion="LOGIN_EXITOSO",
        usuario_id=usuario.id,
        email=usuario.email,
        ip=ip_address
    )

    return token, usuario


# ============================================================
# USUARIO ACTUAL
# ============================================================

def get_usuario_actual(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credenciales_invalidas = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar la credencial",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        usuario_id = payload.get("sub")

        if usuario_id is None:
            raise credenciales_invalidas

    except JWTError:

        raise credenciales_invalidas

    try:

        usuario_id = int(usuario_id)

    except (TypeError, ValueError):

        raise credenciales_invalidas

    usuario = repository.get_usuario_by_id(
        db,
        usuario_id
    )

    if usuario is None:
        raise credenciales_invalidas

    return usuario


# ============================================================
# CONTROL DE ROLES
# ============================================================

def requerir_rol(
    *roles_permitidos: str
):

    def verificador(
        usuario=Depends(get_usuario_actual)
    ):

        # Si rol es un Enum
        rol_usuario = (
            usuario.rol.value
            if hasattr(usuario.rol, "value")
            else str(usuario.rol)
        )

        if rol_usuario not in roles_permitidos:

            raise HTTPException(
                status_code=403,
                detail="No tienes permisos para esta acción"
            )

        return usuario

    return verificador


# ============================================================
# AUDITORÍA
# ============================================================

def obtener_logs_auditoria(db: Session):
    return repository.get_logs_auditoria(db)
