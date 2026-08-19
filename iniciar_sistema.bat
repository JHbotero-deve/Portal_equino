@echo off
setlocal
echo ==========================================
echo INICIANDO SISTEMA GAVAC (MODO ROBUSTO)
echo ==========================================

:: Obtener la ruta actual
set BASE_DIR=%~dp0
cd /d "%BASE_DIR%"

:: Liberar puertos
echo [1/4] Limpiando procesos en puertos 8000 y 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /F /PID %%a 2>nul

:: Iniciar Backend usando la ruta completa al python del venv
echo [2/4] Iniciando Backend (API)...
start "GAVAC BACKEND" cmd /k "cd /d "%BASE_DIR%backend" && venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000 --host 127.0.0.1"

:: Iniciar Frontend usando el mismo python (para asegurar que existe el comando)
echo [3/4] Iniciando Frontend (Web)...
start "GAVAC FRONTEND" cmd /k "cd /d "%BASE_DIR%frontend" && ..\backend\venv\Scripts\python.exe -m http.server 3000 --bind 127.0.0.1"

:: Abrir navegador
echo [4/4] Abriendo navegador en 3 segundos...
timeout /t 3 > nul
start http://127.0.0.1:3000/ganado.html

echo ==========================================
echo REVISA LAS NUEVAS VENTANAS QUE SE ABRIERON
echo ==========================================
echo Si alguna ventana se cierra sola, avisame.
pause

