import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UsuarioToken } from '../types/express';

const SECRET_KEY = process.env.SECRET_KEY || 'clave_secreta_ganadera';

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }

    req.usuario = decoded as UsuarioToken;
    next();
  });
};