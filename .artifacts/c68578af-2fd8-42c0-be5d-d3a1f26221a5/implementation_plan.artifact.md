# Plan de Organización de Rutas y Configuración de Puerto

Este plan detalla los pasos para organizar las rutas del frontend, configurar el puerto 5432 y asegurar la correcta comunicación con el backend de FastAPI y la base de datos Supabase.

## User Review Required

> [!IMPORTANT]
> El puerto **5432** es el puerto por defecto de PostgreSQL/Supabase. Configurar el frontend en este puerto es inusual, pero se realizará según lo solicitado. Asegúrate de que no haya una instancia local de PostgreSQL corriendo en ese puerto, ya que causará conflicto.

> [!NOTE]
> Se recomienda centralizar las rutas del frontend moviendo las páginas principales a la raíz de la carpeta `frontend` para facilitar la navegación con `live-server`.

## Proposed Changes

### Frontend

#### [MODIFY] [package.json](file:///C:/proyecto_Final_Gavac/GAVAC/frontend/package.json)
- Cambiar el script `start` para usar el puerto 5432: `live-server --port=5432 --open=./index.html`.

#### [NEW] [ganado.html](file:///C:/proyecto_Final_Gavac/GAVAC/frontend/ganado.html)
- Mover/Copiar el contenido de `src/modules/ganado/index.html` a la raíz para que sea accesible como `ganado.html`.
- Corregir las rutas de los scripts para que funcionen con `live-server`.

#### [MODIFY] [main.ts (Auth)](file:///C:/proyecto_Final_Gavac/GAVAC/frontend/src/modules/auth/main.ts)
- Cambiar la redirección post-login de `/ganado` a `/ganado.html`.

#### [DELETE] [index.html (Auth Module)](file:///C:/proyecto_Final_Gavac/GAVAC/frontend/src/modules/auth/index.html)
- Eliminar archivos redundantes si se decide usar el `index.html` de la raíz como única entrada de login.

### Backend

#### [MODIFY] [main.py](file:///C:/proyecto_Final_Gavac/GAVAC/backend/app/main.py)
- Actualizar las rutas de `FileResponse` para que coincidan con la nueva ubicación de los archivos HTML en el frontend.

## Verification Plan

### Automated Tests
- No se requieren tests automatizados complejos, se verificará manualmente la navegación.

### Manual Verification
1. Ejecutar el backend: `python -m app.main` (o el comando correspondiente).
2. Ejecutar el frontend: `npm start` desde la carpeta `frontend`.
3. Verificar que el navegador abra `localhost:5432` mostrando el login.
4. Probar el registro de un nuevo usuario.
5. Iniciar sesión y verificar la redirección exitosa a la página de Ganado (`ganado.html`).
6. Verificar que la página de Ganado cargue los datos desde la API (conectada a Supabase).
