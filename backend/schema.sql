-- =====================================================================
-- GAVAC - Esquema de base de datos (SQL Server)
-- Encargado: Elian Martinez
--
-- Este archivo es de referencia: documenta las tablas que existen
-- actualmente en la base de datos real "Gavac".
-- =====================================================================

-- Modulo: auth (Juan) -- backend/app/modules/auth/models.py
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'operario' CHECK (rol IN ('admin', 'operario')),
    created_at DATETIME2 DEFAULT SYSDATETIME()
);

-- Modulo: cattle / ganado (Oscar) -- backend/app/modules/cattle/models.py
CREATE TABLE animales (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tag VARCHAR(50) NOT NULL UNIQUE,
    birth_date DATE NULL,
    sex VARCHAR(10) NULL,
    breed VARCHAR(50) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    updated_at DATETIME2 DEFAULT SYSDATETIME()
);

-- Modulo: reportes (Jorge) -- estructura inicial, pendiente confirmar campos finales con Jorge
CREATE TABLE reportes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME2 DEFAULT SYSDATETIME()
);
