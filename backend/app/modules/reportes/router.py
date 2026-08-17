from typing import List
from fastapi import APIRouter, Depends, Header, HTTPException, status
from .service import ReportService
from .schemas import ReportResponse
from app.security.jwt import verify_token

router = APIRouter(prefix="/api/reportes", tags=["reportes"])

_service = ReportService()


def get_current_user(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    token = authorization.split(" ", 1)[1]
    return verify_token(token)


@router.get("/", response_model=List[ReportResponse])
def get_reports(current_user=Depends(get_current_user)):
    return _service.list_reports()
