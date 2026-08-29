# Plan de Implementación: Gestion Ganadera (Base Sólida)

Este plan establece la arquitectura definitiva para que el equipo trabaje de forma modular, rápida y segura, integrando lo mejor de GAVAC pero optimizado para Node.js y desarrollo Offline-First.

## Objetivo
Crear una base técnica que permita a Oscar, Jorge y Elian subir sus avances sin conflictos, con seguridad de grado empresarial (JWT + Auditoría) y soporte offline.

## Cambios Propuestos

### 1. Infraestructura de Backend (Node.js/Express)
*   **[MODIFY] [index.ts](file:///C:/Workspace_Dev/1_Proyectos/portal%20equino/backend/src/index.ts)**: Reestructurar para ser el "Orquestador" de módulos.
*   **[NEW] Audit Middleware**: Crear `src/middlewares/audit.middleware.ts` para registrar cada acción en la DB (requisito GAVAC).
*   **[NEW] Configuración Vite (Frontend)**: Migrar el frontend a una estructura moderna con Vite para evitar compilaciones manuales fallidas.

### 2. Base de Datos y Modelos
*   **[MODIFY] [db.ts](file:///C:/Workspace_Dev/1_Proyectos/portal%20equino/backend/src/lib/db.ts)**: Reforzar el Pool de Supabase y añadir funciones de utilidad para transacciones.
*   **[NEW] Tablas de Auditoría**: Crear tabla `logs_auditoria` en Supabase.

### 3. Automatización para el Equipo
*   **Scripts de Inicio**: Configurar `npm run setup` que cree el `.env` automáticamente a partir de un template.

## Roadmap de Ejecución (Sin Pausas)

1.  **Fase de Estructura**: Limpieza de archivos temporales y organización de carpetas `modules/` finales.
2.  **Fase de Seguridad**: Implementación de la "Cerca de Seguridad" (JWT + Auditoría).
3.  **Fase de Frontend Moderno**: Configuración de Vite y Tailwind para Elian.
4.  **Fase de Empaquetado**: Creación de los scripts para generar los "ZIPs" o comandos de despliegue rápido para los compañeros.

## Plan de Verificación

### Pruebas Automatizadas
*   Test de conexión a Supabase.
*   Test de validación de JWT (401 Unauthorized vs 200 OK).

### Verificación Manual
*   Confirmar que cada acción (GET/POST) deje una huella en la tabla de auditoría.
*   Verificar que el Frontend cargue instantáneamente con Vite.

> [!IMPORTANT]
> **User Review Required**: Por favor confirma si el equipo está de acuerdo con usar **Vite** para el frontend. Es mucho más rápido y profesional que compilar a mano con `tsc`.
