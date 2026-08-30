# ==========================================================
# JUAN - MÓDULO DE AUTH & ROLES (PORTAL EQUINO)
# ==========================================================
Clear-Host
Write-Host "🔐 ENTORNO DE TRABAJO PARA JUAN (AUTH)" -ForegroundColor Cyan
Write-Host "Preparando JWT y Roles..." -ForegroundColor Gray

cd backend
npm install --quiet
Write-Host "✅ Dependencias de Backend instaladas." -ForegroundColor Green

Write-Host "`nTu área de trabajo principal es:" -ForegroundColor White
Write-Host ">> backend/src/modules/auth/auth.routes.ts" -ForegroundColor Yellow

Write-Host "`nIniciando servidor de autenticación..." -ForegroundColor Cyan
npm run dev
