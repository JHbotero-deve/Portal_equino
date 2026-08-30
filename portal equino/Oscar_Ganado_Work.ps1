# ==========================================================
# OSCAR - MÓDULO DE GANADO (PORTAL EQUINO)
# ==========================================================
Clear-Host
Write-Host "🐎 ENTORNO DE TRABAJO PARA OSCAR (GANADO)" -ForegroundColor Cyan
Write-Host "Preparando herramientas y rutas..." -ForegroundColor Gray

cd backend
npm install --quiet
Write-Host "✅ Dependencias de Backend instaladas." -ForegroundColor Green

Write-Host "`nTu área de trabajo principal es:" -ForegroundColor White
Write-Host ">> backend/src/modules/ganado/ganado.routes.ts" -ForegroundColor Yellow

Write-Host "`nIniciando servidor en modo desarrollo..." -ForegroundColor Cyan
npm run dev
