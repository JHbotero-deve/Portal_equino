@echo off
echo ==========================================
echo    GAVAC - SISTEMA DE GESTION GANADERA
echo ==========================================
echo.
echo [1/3] Liberando puerto 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do taskkill /f /pid %%a 2>nul
echo [2/3] Instalando requerimientos...
pip install -q -r backend/requirements.txt
echo [3/3] Iniciando servidor GAVAC...
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause
