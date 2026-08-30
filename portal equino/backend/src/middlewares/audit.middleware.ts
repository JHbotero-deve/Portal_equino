import { Request, Response, NextFunction } from 'express';
import pool from '../lib/db';

// Middleware de Auditoría Avanzada: Registra cambios con IP y Usuario
export const auditoriaMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        res.send = function (content) {
            const statusCode = res.statusCode;
            const usuarioId = req.usuario?.id?.toString() || 'ANONIMO';
            const accion = `${req.method} ${req.originalUrl}`;
            const ip = req.ip || req.socket.remoteAddress || 'IP_DESCONOCIDA';

            if (statusCode >= 200 && statusCode < 300) {
                // Registro con detalles e IP para mayor seguridad
                const detalles = {
                    body: req.body,
                    ip: ip,
                    params: req.params
                };

                pool.query(
                    'INSERT INTO logs_auditoria (usuario_id, accion, detalles, fecha) VALUES ($1, $2, $3, NOW())',
                    [usuarioId, accion, JSON.stringify(detalles)]
                ).catch(err => console.error('Error en Auditoría Crítica:', err));
            }

            return originalSend.call(this, content);
        };
    }

    next();
};