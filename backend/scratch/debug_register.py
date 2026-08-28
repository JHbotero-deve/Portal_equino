import sys
import os

# Agregar el directorio actual al path para importar app
sys.path.append(os.getcwd())

from app.database import SessionLocal
from app.modules.auth import service, schemas

def debug_register():
    db = SessionLocal()
    # Usar un email que probablemente no existe para evitar el 400 y forzar el proceso completo
    test_email = "debug_test_123@gmail.com"
    test_data = schemas.UsuarioCreate(
        email=test_email,
        password="password123",
        rol="operario"
    )
    
    print(f"--- Intentando registrar a {test_email} ---")
    try:
        usuario = service.registrar_usuario(db, test_data, ip_address="127.0.0.1")
        print(f"✅ Éxito: Usuario ID {usuario.id} creado.")
    except Exception as e:
        print(f"❌ Error capturado: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    debug_register()
