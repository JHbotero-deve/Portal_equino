# Plan de Configuración de Puerto 5434 para el Frontend

Este plan configura el puerto **5434** para el frontend, permitiendo su ejecución independiente mientras se comunica con el backend en el puerto **8000**.

## User Review Required

> [!IMPORTANT]
> El puerto **5434** se utilizará para el servidor de desarrollo del frontend (`live-server`).
> El backend continuará operando en el puerto **8000**.
> Se debe asegurar que el puerto **5434** esté libre en el sistema.

## Proposed Changes

### Frontend

#### [MODIFY] [package.json](file:///C:/proyecto_Final_Gavac/GAVAC/frontend/package.json)
- Cambiar el script `start` para usar el puerto **5434**: `live-server --port=5434 --open=./index.html`.

### Backend

#### [MODIFY] [main.py](file:///C:/proyecto_Final_Gavac/GAVAC/backend/app/main.py)
- Añadir `http://127.0.0.1:5434` y `http://localhost:5434` a la lista de orígenes permitidos en el middleware de CORS.

## Verification Plan

### Manual Verification
1.  **Frontend**: Ejecutar `npm start` en la carpeta `frontend`. Verificar que se abra el navegador en `http://localhost:5434`.
2.  **Backend**: Ejecutar `uvicorn app.main:app --reload --port 8000` en la carpeta `backend`.
3.  **Login**: Intentar iniciar sesión desde el frontend (5434). Verificar que la petición llegue al backend (8000) y el login sea exitoso.
4.  **Redirección**: Confirmar que tras el login, el sistema te lleve a la página de ganado.
