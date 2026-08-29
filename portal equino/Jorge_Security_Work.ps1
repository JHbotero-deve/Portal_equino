# ==========================================================
# JORGE - MÓDULO DE SEGURIDAD & AUDITORÍA (PORTAL EQUINO)
# ==========================================================
Clear-Host
Write-Host "🛡️ ENTORNO DE TRABAJO PARA JORGE (SEGURIDAD)" -ForegroundColor Cyan
Write-Host "Preparando Middleware de Auditoría y Protección..." -ForegroundColor Gray

cd backend
npm install --quiet
Write-Host "✅ Dependencias de Backend instaladas." -ForegroundColor Green

Write-Host "`nTu área de trabajo principal es:" -ForegroundColor White
Write-Host ">> backend/src/middlewares/audit.middleware.ts" -ForegroundColor Yellow
Write-Host ">> backend/src/middlewares/jwt.middleware.ts" -ForegroundColor Yellow

Write-Host "`nIniciando servidor con monitoreo de auditoría..." -ForegroundColor Cyan
npm run dev
