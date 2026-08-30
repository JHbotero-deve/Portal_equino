import { Pool } from 'pg';
import type { PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del Pool para PostgreSQL (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Requerido para conexiones seguras con Supabase
  }
});

pool.on('connect', () => {
  console.log('Conectado exitosamente a Supabase (PostgreSQL)');
});

pool.on('error', (err) => {
  console.error('Error inesperado en el cliente de base de datos', err);
});

// Utilidad para Transacciones Seguras (Requisito Base Sólida)
export const withTransaction = async <T>(callback: (client: PoolClient) => Promise<T>): Promise<T> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Crear tablas iniciales si no existen
const inicializarDB = async () => {
  const queryGanado = `
    CREATE TABLE IF NOT EXISTS ganado (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      tipo VARCHAR(50),
      peso DECIMAL(10,2)
    );
  `;
  const queryUsuarios = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      correo VARCHAR(100) UNIQUE NOT NULL,
      clave TEXT NOT NULL,
      rol VARCHAR(20) DEFAULT 'usuario'
    );
  `;
  const queryAuditoria = `
    CREATE TABLE IF NOT EXISTS logs_auditoria (
      id SERIAL PRIMARY KEY,
      usuario_id TEXT,
      accion TEXT,
      detalles TEXT,
      fecha TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(queryGanado);
    await pool.query(queryUsuarios);
    await pool.query(queryAuditoria);
    console.log('Tablas verificadas en Supabase (Incluye Auditoría)');
  } catch (err) {
    console.error('Error al inicializar tablas:', err);
  }
};

inicializarDB();

export default pool;