# ==========================================================
# ELIAN - MÓDULO DE FRONTEND (PORTAL EQUINO)
# ==========================================================
Clear-Host
Write-Host "🎨 ENTORNO DE TRABAJO PARA ELIAN (FRONTEND)" -ForegroundColor Cyan
Write-Host "Preparando Vite + Tailwind..." -ForegroundColor Gray

cd frontend
npm install --quiet
Write-Host "✅ Dependencias de Frontend instaladas." -ForegroundColor Green

Write-Host "`nTu área de trabajo principal es:" -ForegroundColor White
Write-Host ">> frontend/src/" -ForegroundColor Yellow

Write-Host "`nIniciando entorno Vite (HMR activo)..." -ForegroundColor Cyan
npm run dev
