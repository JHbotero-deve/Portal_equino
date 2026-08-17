from sqlalchemy import text
from app.database import engine

def main():
    print(f"Intentando conectar a: {engine.url}")
    try:
        with engine.connect() as conn:
            print("Conexion exitosa a SQL Server.")
            result = conn.execute(text("SELECT COUNT(*) FROM usuarios"))
            total = result.scalar()
            print(f"Tabla usuarios encontrada. Filas actuales: {total}")
    except Exception as e:
        print("Error al conectar o consultar:")
        print(e)

if __name__ == "__main__":
    main()