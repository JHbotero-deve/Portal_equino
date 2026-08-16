# Módulo `reportes` — Consultas y Reportes

**Responsable:** Jorge Botero

Sigue exactamente el mismo patrón del módulo `cattle` (carpeta hermana):

```
reportes/
├── __init__.py
├── schemas.py        # Schemas de Pydantic: forma de los reportes/respuestas
├── repository.py     # Consultas a la base de datos (lectura, principalmente)
├── service.py         # Lógica de negocio: cálculos, agrupaciones, generación de PDF/Excel
└── router.py          # Endpoints HTTP, montados en /api/reportes
```

Este módulo probablemente NO necesita `models.py` propio, ya que va a
**leer** datos del modelo `Animal` que está en `../cattle/models.py`
(por ejemplo, para generar reportes de ganado por raza o estado).

## Pasos para empezar

1. Importa el modelo que necesites así: `from app.modules.cattle.models import Animal`.
2. En `router.py`, usa `prefix="/api/reportes"` para no chocar con `/api/ganado` ni `/api/auth`.
3. Regístralo en `backend/app/main.py`:
   ```python
   from app.modules.reportes.router import router as reportes_router
   app.include_router(reportes_router)
   ```
4. **No modifiques `app/database.py`** ni los archivos dentro de `../cattle/` — si necesitas un dato que no existe en el modelo `Animal`, coordina con Oscar (líder) antes de agregarlo.
5. Para exportar a PDF o Excel se recomienda `reportlab` o `openpyxl` (agrégalas a `requirements.txt` si las usas).

## Dudas de arranque
- Instala dependencias con `pip install -r ../requirements.txt` (compartido por todo el backend).
- Corre el backend con `uvicorn app.main:app --reload --port 8000` y prueba tus endpoints en `http://localhost:8000/docs`.
