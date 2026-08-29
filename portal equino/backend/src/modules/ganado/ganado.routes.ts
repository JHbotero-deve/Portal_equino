import { Router } from 'express';
import pool from '../../lib/db';
import { validarJWT } from '../../middlewares/jwt.middleware';

const router = Router();

// Obtener todos los animales (PostgreSQL usa async/await)
router.get('/', validarJWT, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM ganado");
        res.json({
            mensaje: "Datos obtenidos de Supabase",
            datos: result.rows
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Registrar un nuevo animal (Usando sintaxis $1, $2 para PostgreSQL)
router.post('/registrar', validarJWT, async (req, res) => {
    const { nombre, tipo, peso } = req.body;
    const sql = 'INSERT INTO ganado (nombre, tipo, peso) VALUES ($1, $2, $3) RETURNING *';

    try {
        const result = await pool.query(sql, [nombre, tipo, peso]);
        res.json({
            mensaje: "Animal registrado en la nube",
            datos: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;