import rateLimit from 'express-rate-limit';

// Previene ataques de fuerza bruta limitando peticiones por IP
export const limitadorPeticiones = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por IP
  message: 'Demasiadas peticiones desde esta IP, por favor intente más tarde.'
});