---
name: "Revisión — checklist"
about: "Plantilla para ejecutar la fase de Revisión: lista de comprobaciones iniciales del repositorio"
labels: [review]
---

## Revisión: propósito
Comprobar el estado actual del repositorio, estructura y artefactos esenciales.

## Pasos
- Listar archivos principales: `README.md`, `package.json`, `prisma/schema.prisma`, `.github/workflows`.
- Verificar que `src/` y `src/modules/` existen y contienen README de módulo.
- Confirmar `.gitignore` y ausencia de secretos en commits.
- Registrar hallazgos adjuntando `docs/review-YYYYMMDD.txt` si corresponde.

## Checklist mínima
- [ ] `README.md` presente
- [ ] `package.json` o equivalente presente
- [ ] `prisma/schema.prisma` (si aplica)
- [ ] `.gitignore` cubre secretos

## Evidencia
Adjunta logs o capturas, o indica la ruta del archivo de revisión generado.
