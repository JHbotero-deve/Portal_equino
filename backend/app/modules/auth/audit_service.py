from typing import Optional
from sqlalchemy.orm import Session
from .models import AuditoriaLog

def registrar_accion(
    db: Session, 
    accion: str, 
    usuario_id: Optional[int] = None, 
    email: Optional[str] = None, 
    detalles: Optional[str] = None, 
    ip: Optional[str] = None
):
    """
    Registra una acción en la tabla de auditoría para trazabilidad profesional.
    """
    log = AuditoriaLog(
        usuario_id=usuario_id,
        email=email,
        accion=accion,
        detalles=detalles,
        ip_address=ip
    )
    db.add(log)
    try:
        db.commit()
        db.refresh(log)
    except Exception as e:
        db.rollback()
        print(f"⚠️ Error al registrar auditoría: {e}")
    return log
