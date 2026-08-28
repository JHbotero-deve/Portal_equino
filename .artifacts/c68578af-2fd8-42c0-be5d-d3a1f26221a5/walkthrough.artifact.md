# Walkthrough - Configuración de Puerto 5434 y Comunicación API

Se ha configurado el proyecto para que el frontend se ejecute en el puerto **5434** de forma independiente, manteniendo la comunicación con el backend en el puerto **8000**.

## Cambios Realizados

### Frontend
- **Configuración de Puerto**: Se actualizó el archivo `frontend/package.json` para que el servidor `live-server` utilice el puerto **5434**. Esto evita conflictos con otros servicios locales que pudieran estar usando el puerto 5432.

### Backend
- **Actualización de Seguridad (CORS)**: Se modificó `backend/app/main.py` para incluir `http://localhost:5434` en la lista de orígenes permitidos. Esto es esencial para que el navegador permita las peticiones de Login y Registro desde el nuevo puerto del frontend hacia la API.

## Instrucciones de Ejecución

Para iniciar el sistema completo, abre dos terminales en Visual Studio Code:

### Terminal 1: Backend
```powershell
cd backend
uvicorn app.main:app --reload --port 8000
```

### Terminal 2: Frontend
```powershell
cd frontend
npm start
```
*El navegador se abrirá automáticamente en `http://localhost:5434`.*

## Verificación
1. Accede a `http://localhost:5434`.
2. Verás la pantalla de login verde de **GAVAC**.
3. Realiza el login; la comunicación con el backend (puerto 8000) ahora funcionará correctamente sin errores de CORS.
