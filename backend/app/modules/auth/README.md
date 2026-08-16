# Módulo `auth` — Usuarios y Autenticación

**Responsable:** Juan Herrera

Sigue exactamente el mismo patrón del módulo `cattle` (carpeta hermana),
así todos los módulos se ven y funcionan igual:

```
auth/
├── __init__.py
├── models.py       # Modelo SQLAlchemy: tabla de usuarios
├── schemas.py       # Schemas de Pydantic: validación de datos de entrada/salida
├── repository.py    # Únicas funciones que hablan con la base de datos
├── service.py        # Lógica de negocio (ej. verificar contraseña, generar token)
└── router.py         # Endpoints HTTP, montados en /api/auth
```

## Pasos para empezar

1. Copia la estructura de `../cattle/` como referencia (mismo orden de capas).
2. Define el modelo `Usuario` en `models.py` (campos sugeridos: id, email, password_hash, rol, created_at).
3. En `router.py`, usa `prefix="/api/auth"` para que no choque con las rutas de `/api/ganado` ni `/api/reportes`.
4. Regístralo en `backend/app/main.py`:
   ```python
   from app.modules.auth.router import router as auth_router
   app.include_router(auth_router)
   ```
5. **No modifiques `app/database.py`** — todos los módulos comparten la misma configuración de base de datos.
6. Corre el backend con `uvicorn app.main:app --reload --port 8000` y prueba tus endpoints en `http://localhost:8000/docs`.

## Dudas de arranque
- Instala dependencias con `pip install -r ../requirements.txt` (una sola vez, compartido por todo el backend).
- Para hashear contraseñas se recomienda la librería `passlib` (agrégala a `requirements.txt` si la usas).
- Coordina con Oscar (líder) antes de tocar cualquier archivo fuera de esta carpeta.
