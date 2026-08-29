import { Request, Response, NextFunction } from 'express';
import pool from '../lib/db';

// Middleware de Auditoría: Registra cada acción de escritura (POST, PUT, DELETE)
export const auditoriaMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    // Solo auditamos métodos que cambian datos o acciones importantes
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {

        // Interceptamos la respuesta para saber si fue exitosa
        res.send = function (content) {
            const statusCode = res.statusCode;
            // @ts-ignore
            const usuarioId = req.usuario?.id || 'ANONIMO';
            const accion = `${req.method} ${req.originalUrl}`;

            // Registro asíncrono en la tabla de auditoría
            if (statusCode >= 200 && statusCode < 300) {
                pool.query(
                    'INSERT INTO logs_auditoria (usuario_id, accion, detalles, fecha) VALUES ($1, $2, $3, NOW())',
                    [usuarioId, accion, JSON.stringify(req.body)]
                ).catch(err => console.error('Error en Auditoría:', err));
            }

            return originalSend.call(this, content);
        };
    }

    next();
};