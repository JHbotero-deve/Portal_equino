# Módulo `cattle` — Registro de Ganado

**Responsable:** Oscar (líder)

```
cattle/
├── __init__.py
├── models.py       # Modelo SQLAlchemy: tabla de animales
├── schemas.py       # Schemas de Pydantic: validación de datos de entrada/salida
├── repository.py    # Únicas funciones que hablan con la base de datos
├── service.py        # Lógica de negocio (ej. no permitir tags duplicados)
└── router.py         # Endpoints HTTP, montados en /api/ganado
```

## Pasos para empezar

1. Define el modelo `Animal` en `models.py` (campos sugeridos: id, tag, birth_date, sex, breed, status, created_at, updated_at).
2. En `router.py`, usa `prefix="/api/ganado"` para que no choque con `/api/auth` ni `/api/reportes`.
3. Regístralo en `backend/app/main.py`:
   ```python
   from app.modules.cattle.router import router as cattle_router
   app.include_router(cattle_router)
   ```
4. **No modifiques `app/database.py`** — todos los módulos comparten la misma configuración de base de datos.
5. Corre el backend con `uvicorn app.main:app --reload --port 8000` y prueba tus endpoints en `http://localhost:8000/docs`.

## Dudas de arranque
- Instala dependencias con `pip install -r ../requirements.txt` (compartido por todo el backend).
- Coordina con Elian (base de datos) cuando el modelo real esté listo en SQL Server.
