import os
from typing import Any, Dict

from jose import JWTError, jwt
from fastapi import HTTPException, status

import app.config  # Carga backend/.env antes de leer las variables.

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"


def verify_token(token: str) -> Dict[str, Any]:
    if not SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="JWT_SECRET no está configurada",
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": "Bearer"},
        )
