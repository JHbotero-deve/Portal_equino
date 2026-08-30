# Gestion Ganadera - Base Sólida

Este proyecto es una evolución del stack de GAVAC, optimizado para ser **Modular, seguro y Offline-First**.

## Roles en el Equipo
- **Oscar (Líder)**: Módulo de Ganado (`backend/src/modules/ganado`)
- **Jorge (Backend)**: Módulo de Auditoría y seguridad
- **Juan (Auth)**: Autenticación y Roles (`backend/src/modules/auth`)
- **Elian (Frontend)**: Interfaz de usuario con Vite + Tailwind (`frontend/`)

## Entrega Profesional
Para generar una entrega limpia y verificada para el cliente o el servidor de producción, ejecuta el script inteligente desde PowerShell:
`.\PortalEquino_Pro_Deploy.ps1`

Este script se encarga de:
1. Instalar dependencias automáticamente.
2. Compilar el código TypeScript.
3. Verificar la conexión con Supabase.
4. Crear una carpeta `ENTREGA_FINAL_PRO` con solo los archivos necesarios para el despliegue.

## Arquitectura de seguridad
- **JWT**: Tokens de 8 horas.
- **Auditoría**: Cada registro/cambio queda guardado en la tabla `logs_auditoria` de supabase.
- **RBAC**: soporte para roles `admin` y `usuario`.

## Repositorio Base
Inspirado en [GAVAC](https://github.com/oscarandresnavamen18-debut/GAVAC).
