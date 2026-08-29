# Gestion Ganadera - Base Sólida

Este proyecto es una evolución del stack de GAVAC, optimizado para ser **Modular, seguro y Offline-First**.

## Roles en el Equipo
- **Oscar (Líder)**: Módulo de Ganado (`backend/src/modules/ganado`)
- **Jorge (Backend)**: Módulo de Auditoría y seguridad
- **Juan (Auth)**: Autenticación y Roles (`backend/src/modules/auth`)
- **Elian (Frontend)**: Interfaz de usuario con Vite + Tailwind (`frontend/`)

## Instalación Rápida
1. **Backend**:
   - `cd backend`
   - `npm install`
   - `npm run setup` (Crea  .env, configúralo con supabase)
   - `npm run dev`
2. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Arquitectura de seguridad
- **JWT**: Tokens de 8 horas.
- **Auditoría**: Cada registro/cambio queda guardado en la tabla `logs_auditoria` de supabase.
- **RBAC**: soporte para roles `admin` y `usuario`.

## Repositorio Base
Inspirado en [GAVAC](https://github.com/oscarandresnavamen18-debut/GAVAC).
