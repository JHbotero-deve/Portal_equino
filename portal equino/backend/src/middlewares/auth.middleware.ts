import { Request, Response, NextFunction } from 'express';

// Verifica si el usuario tiene rol de administrador o permisos específicos
export const esAdministrador = (req: Request, res: Response, next: NextFunction) => {
  const usuario = req.usuario;

  if (usuario && usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado: Se requieren permisos de administrador' });
  }
};