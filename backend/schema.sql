-- =====================================================================
-- GAVAC - Esquema de base de datos (SQL Server)
-- Encargado: Elian Martínez
--
-- Este archivo es de referencia: documenta las tablas que existen
-- actualmente en la base de datos real "Gavac". Cada tabla corresponde
-- al modelo SQLAlchemy (models.py) definido en su respectivo módulo
-- de backend/app/modules/.
--
-- Si tu módulo aún no aparece aquí, avisa a Elian para agregar tu tabla.
-- =====================================================================

-- Modulo: auth (Juan) -- backend/app/modules/auth/models.py
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'operario' CHECK (rol IN ('admin', 'operario')),
    created_at DATETIME2 DEFAULT SYSDATETIME()
);

-- Modulo: reportes (Jorge) -- pendiente
-- Modulo: cattle / ganado (Oscar) -- pendiente