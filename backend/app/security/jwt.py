import os
from typing import Any, Dict

from jose import JWTError, jwt
from fastapi import HTTPException, status


SECRET_KEY = os.getenv("JWT_SECRET", "change-me")
ALGORITHM = "HS256"


def verify_token(token: str) -> Dict[str, Any]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
