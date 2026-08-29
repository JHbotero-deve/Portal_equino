import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'clave_secreta_ganadera'; // En producción usar variable de entorno

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    // @ts-ignore
    req.usuario = decoded;
    next();
  });
};