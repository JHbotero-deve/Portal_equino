"""
Service: lógica de negocio del módulo de ganado.
"""
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.modules.cattle import repository as repo
from app.modules.cattle.schemas import AnimalCreate, AnimalUpdate


def list_animals(db: Session, breed=None, sex=None, status_=None, tag=None):
    return repo.find_all(db, breed=breed, sex=sex, status=status_, tag=tag)


def get_animal(db: Session, animal_id: int):
    animal = repo.find_by_id(db, animal_id)
    if not animal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                             detail=f"No existe un animal con id {animal_id}.")
    return animal


def register_animal(db: Session, data: AnimalCreate):
    if repo.find_by_tag(db, data.tag):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                             detail=f"Ya existe un animal registrado con el tag '{data.tag}'.")
    return repo.create(db, data)


def update_animal(db: Session, animal_id: int, data: AnimalUpdate):
    animal = get_animal(db, animal_id)
    if data.tag:
        existente = repo.find_by_tag(db, data.tag)
        if existente and existente.id != animal_id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                 detail=f"Ya existe otro animal con el tag '{data.tag}'.")
    return repo.update(db, animal, data)


def delete_animal(db: Session, animal_id: int):
    animal = get_animal(db, animal_id)
    repo.remove(db, animal)
