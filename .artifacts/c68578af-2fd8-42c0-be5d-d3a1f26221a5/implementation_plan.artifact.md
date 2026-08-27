# Plan de Organización del Workflow (CI/CD y PRs)

Este plan tiene como objetivo estandarizar y automatizar el flujo de trabajo para las Pull Requests, asegurando que cada cambio mantenga la calidad del código y la integridad del sistema.

## User Review Required

> [!IMPORTANT]
> El archivo `PULL_REQUEST_TEMPLATE.md` actual menciona herramientas como **Prisma** o comandos como `npm test` que no están configurados en el proyecto. Se propone actualizarlos para reflejar la realidad del proyecto (SQLAlchemy y TypeScript).

> [!NOTE]
> Se recomienda añadir `flake8` y `pytest` al backend en el futuro para una validación más profunda. Por ahora, nos centraremos en lo que el repositorio ya tiene.

## Proposed Changes

### GitHub Workflows

#### [MODIFY] [repo-audit.yml](file:///C:/proyecto_Final_Gavac/GAVAC/.github/workflows/repo-audit.yml)
- Ampliar el flujo para incluir un paso de **Build Check** del frontend usando `tsc`. Esto garantizará que ninguna PR se mezcle si tiene errores de tipos en TypeScript.
- Añadir validación de sintaxis básica para Python.

### Plantillas de Repositorio

#### [MODIFY] [PULL_REQUEST_TEMPLATE.md](file:///C:/proyecto_Final_Gavac/GAVAC/.github/PULL_REQUEST_TEMPLATE.md)
- Ajustar el checklist para mencionar la base de datos **Supabase/SQLAlchemy** en lugar de Prisma.
- Actualizar los comandos de validación local recomendados.

### Documentación de Auditoría

#### [MODIFY] [1_revision.txt](file:///C:/proyecto_Final_Gavac/GAVAC/docs/sections/1_revision.txt) (Si existe)
- Revisar si las guías de revisión están alineadas con la nueva estructura modular.

## Verification Plan

### Automated Tests
- Ejecutar el workflow localmente (si se dispone de herramientas de simulación como `act`) o disparar un evento de push para verificar que el nuevo `repo-audit.yml` no falle por errores de sintaxis en el YAML.

### Manual Verification
1. Crear una rama de prueba y abrir una PR ficticia para ver cómo se visualiza el nuevo template.
2. Verificar que el paso de compilación de TypeScript (`tsc`) se ejecute correctamente en el entorno de GitHub Actions.
