@echo off
echo ==========================================
echo INICIANDO SISTEMA GAVAC (Backend + Frontend)
echo ==========================================

:: Liberar puertos si están ocupados
echo [1/4] Limpiando procesos previos...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /F /PID %%a 2>nul

:: Iniciar Backend
echo [2/4] Iniciando Backend (API) en puerto 8000...
start "GAVAC BACKEND" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

:: Iniciar Frontend
echo [3/4] Iniciando Frontend (Web) en puerto 3000...
start "GAVAC FRONTEND" cmd /k "cd frontend && python -m http.server 3000"

:: Abrir navegador
echo [4/4] Abriendo navegador...
timeout /t 5 > nul
start http://localhost:3000

echo ==========================================
echo ¡SISTEMA LISTO!
echo ==========================================
pause
