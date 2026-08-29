import { Router } from 'express';
import pool from '../../lib/db';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || 'clave_secreta_ganadera';

// Registro de Usuario (Con soporte para roles RBAC)
router.post('/register', async (req, res) => {
    const { correo, clave, rol } = req.body;
    try {
        const query = 'INSERT INTO usuarios (correo, clave, rol) VALUES ($1, $2, $3) RETURNING id, correo, rol';
        const result = await pool.query(query, [correo, clave, rol || 'usuario']);

        // Auditoría explícita de registro
        await pool.query(
            'INSERT INTO logs_auditoria (usuario_id, accion, detalles) VALUES ($1, $2, $3)',
            [result.rows[0].id.toString(), 'REGISTRO_USUARIO', `Nuevo usuario: ${correo}`]
        );

        res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: result.rows[0] });
    } catch (err: any) {
        res.status(400).json({ error: "El correo ya existe o los datos son inválidos" });
    }
});

// Inicio de Sesión (Login con Auditoría de Accesos)
router.post('/login', async (req, res) => {
    const { correo, clave } = req.body;
    try {
        const query = 'SELECT * FROM usuarios WHERE correo = $1 AND clave = $2';
        const result = await pool.query(query, [correo, clave]);

        if (result.rows.length > 0) {
            const usuario = result.rows[0];
            // Generar Token con Rol incluido para RBAC
            const token = jwt.sign(
                { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
                SECRET_KEY,
                { expiresIn: '8h' }
            );

            // Registro de Auditoría GAVAC
            await pool.query(
                'INSERT INTO logs_auditoria (usuario_id, accion, detalles) VALUES ($1, $2, $3)',
                [usuario.id.toString(), 'LOGIN_EXITOSO', `Usuario ${correo} inició sesión`]
            );

            res.json({ mensaje: "Login exitoso", token });
        } else {
            // Registro de Auditoría de fallo
            await pool.query(
                'INSERT INTO logs_auditoria (usuario_id, accion, detalles) VALUES ($1, $2, $3)',
                ['ANONIMO', 'LOGIN_FALLIDO', `Intento fallido con correo: ${correo}`]
            );
            res.status(401).json({ error: "Credenciales incorrectas" });
        }
    } catch (err: any) {
        res.status(500).json({ error: "Error en el servidor durante el login" });
    }
});

export default router;