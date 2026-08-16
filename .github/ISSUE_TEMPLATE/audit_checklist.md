---
name: "Auditoría — checklist"
about: "Plantilla para ejecutar la fase de Auditoría: ejecutar checks automáticos y manuales"
labels: [audit]
---

## Auditoría: propósito
Ejecutar comprobaciones que garanticen calidad, seguridad y reproducibilidad.

## Pasos
1. Ejecutar el workflow de auditoría o revisar la salida en CI.
2. Comprobar que linter y tests (si existen) pasan.
3. Revisar dependencias vulnerables y reportar.
4. Generar nota/ticket con fallas críticas y tareas de corrección.

## Checklist mínima
- [ ] Auditoría CI verde o errores documentados
- [ ] Linter -> OK o issues asignados
- [ ] Tests -> OK o cobertura mínima definida

## Evidencia
Adjuntar enlaces a logs de CI, reportes de linter o capturas.
