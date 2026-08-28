# 🏁 Guía de Instalación y Ejecución - GAVAC

Esta guía contiene los comandos exactos para configurar el entorno y ejecutar el sistema evitando errores comunes de compatibilidad.

---

## 1️⃣ Configuración del Entorno (Primera Vez)

Ejecuta estos comandos desde la carpeta raíz del proyecto:

```powershell
# Entrar al backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (PowerShell)
.\venv\Scripts\Activate.ps1

# Configurar compatibilidad para Python 3.14 (¡CRÍTICO!)
$env:PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1

# Instalar librerías esenciales
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 2️⃣ Preparar la Base de Datos

1. Crea una copia del archivo de ejemplo:
   ```powershell
   cp .env.example .env
   ```
2. Abre el archivo `.env` y asegúrate de que la `DATABASE_URL` sea la proporcionada por Elian (Supabase).

---

## 3️⃣ Ejecución del Servidor (Comando Diario)

Abre una terminal en la carpeta `backend` y ejecuta este bloque:

```powershell
# 1. Activar entorno
.\venv\Scripts\Activate.ps1

# 2. Configurar contexto de módulos y compatibilidad
$env:PYTHONPATH="."
$env:PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1

# 3. Lanzar FastAPI
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 💡 Consejos de Uso

- **Documentación:** Una vez el servidor diga "Uvicorn running", entra a [http://localhost:8000/docs](http://localhost:8000/docs) para probar los endpoints.
- **Frontend:** Si vas a trabajar en la UI, recuerda compilar el TypeScript ejecutando `npx tsc` dentro de la carpeta `frontend`.
- **Auditoría:** Todas tus acciones quedarán registradas en la tabla de logs de Supabase automáticamente.

---

> [!IMPORTANT]
> Si recibes el error `ModuleNotFoundError: No module named 'app'`, verifica que hayas ejecutado `$env:PYTHONPATH="."` antes de lanzar uvicorn.
