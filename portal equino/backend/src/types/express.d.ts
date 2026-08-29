import { Request } from 'express';

export interface UsuarioToken {
  id: number;
  correo: string;
  rol: string;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioToken;
    }
  }
}