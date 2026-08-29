import { Request, Response, NextFunction } from 'express';

// Manejador centralizado de errores para evitar fugas de información
export const manejadorErrores = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    mensaje: 'Ocurrió un error interno en el servidor ganadero',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};