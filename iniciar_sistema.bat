@echo off
setlocal
echo ==========================================
echo INICIANDO SISTEMA GAVAC (UNIFICADO)
echo ==========================================

:: Liberar puerto 8000 si está ocupado
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do taskkill /F /PID %%a 2>nul

:: Iniciar Backend (que ahora también sirve el frontend)
echo [1/2] Iniciando Servidor API + Web...
cd /d "%~dp0backend"
start "GAVAC SERVER" cmd /k "venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"

:: Abrir navegador
echo [2/2] Abriendo el sistema en el navegador...
timeout /t 5 > nul
start http://127.0.0.1:8000/ganado

echo ==========================================
echo ¡SISTEMA LISTO!
echo ==========================================
pause
