import { Router } from 'express';
import pool from '../../lib/db';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || 'clave_secreta_ganadera';

// Registro de Usuario (Con soporte para roles opcional)
router.post('/register', async (req, res) => {
    const { correo, clave, rol } = req.body;
    try {
        const query = 'INSERT INTO usuarios (correo, clave, rol) VALUES ($1, $2, $3) RETURNING id, correo, rol';
        const result = await pool.query(query, [correo, clave, rol || 'usuario']);
        res.status(201).json({ mensaje: "Usuario creado", usuario: result.rows[0] });
    } catch (err: any) {
        res.status(400).json({ error: "El correo ya existe o faltan datos críticos" });
    }
});

// Inicio de Sesión (Login)
router.post('/login', async (req, res) => {
    const { correo, clave } = req.body;
    try {
        const query = 'SELECT * FROM usuarios WHERE correo = $1 AND clave = $2';
        const result = await pool.query(query, [correo, clave]);

        if (result.rows.length > 0) {
            const usuario = result.rows[0];
            // Generar Token
            const token = jwt.sign(
                { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
                SECRET_KEY,
                { expiresIn: '8h' }
            );
            res.json({ mensaje: "Login exitoso", token });
        } else {
            res.status(401).json({ error: "Credenciales incorrectas" });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;