"""
Rutas del módulo cattle (ganado), montadas en /api/ganado desde main.py.
"""
from typing import Optional, List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.modules.cattle.schemas import AnimalCreate, AnimalUpdate, AnimalOut
from app.modules.cattle import service

router = APIRouter(prefix="/api/ganado", tags=["Ganado"])


@router.get("/", response_model=List[AnimalOut])
def listar_animales(
    breed: Optional[str] = None,
    sex: Optional[str] = None,
    status_: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db),
):
    return service.list_animals(db, breed=breed, sex=sex, status_=status_, tag=tag)


@router.get("/{animal_id}", response_model=AnimalOut)
def obtener_animal(animal_id: int, db: Session = Depends(get_db)):
    return service.get_animal(db, animal_id)


@router.post("/", response_model=AnimalOut, status_code=status.HTTP_201_CREATED)
def registrar_animal(data: AnimalCreate, db: Session = Depends(get_db)):
    return service.register_animal(db, data)


@router.put("/{animal_id}", response_model=AnimalOut)
def actualizar_animal(animal_id: int, data: AnimalUpdate, db: Session = Depends(get_db)):
    return service.update_animal(db, animal_id, data)


@router.delete("/{animal_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_animal(animal_id: int, db: Session = Depends(get_db)):
    service.delete_animal(db, animal_id)
