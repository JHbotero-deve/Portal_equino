# Plan de Implementación: Gestión Ganadera (Base Sólida)

Este plan establece la arquitectura modular y segura para el proyecto, integrando Node.js, Express y Supabase con soporte para auditoría y offline-first.

## Proposed Changes

### Backend (Node.js/Express)

#### [MODIFY] [index.ts](file:///backend/src/index.ts)
Reestructurar para actuar como orquestador de módulos.

#### [NEW] [audit.middleware.ts](file:///backend/src/middlewares/audit.middleware.ts)
Middleware para registrar acciones en la base de datos.

#### [MODIFY] [auth.routes.ts](file:///backend/src/modules/auth.routes.ts)
Incluir roles (RBAC) y auditoría.

#### [MODIFY] [db.ts](file:///backend/src/lib/db.ts)
Reforzar el pool de conexión y añadir utilidades para transacciones.

### Frontend (Modernización)

#### [NEW] [Vite Configuration](file:///frontend/vite.config.ts)
Configuración de Vite y Tailwind para desarrollo rápido.

### Automatización

#### [MODIFY] [package.json](file:///backend/package.json)
Scripts de setup automatizado.

## Verification Plan

### Automated Tests
- Test de conexión a Supabase.
- Test de validación de JWT.

### Manual Verification
- Verificar registros en la tabla `logs_auditoria`.
- Verificar carga instantánea del frontend con Vite.
