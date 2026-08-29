import express from 'express';
import { limitadorPeticiones } from './middlewares/rate-limit.middleware';
import { manejadorErrores } from './middlewares/error.middleware';
import { auditoriaMiddleware } from './middlewares/audit.middleware';
import ganadoRoutes from './modules/ganado/ganado.routes';
import authRoutes from './modules/auth/auth.routes';

const app = express();
const PORT = 3000;

// 1. Middlewares Globales
app.use(express.json());
app.use(limitadorPeticiones);
app.use(auditoriaMiddleware);

// 2. Rutas de Módulos
app.use('/api/auth', authRoutes);
app.use('/api/ganado', ganadoRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('Servidor de Gestion Ganadera Activo y Verificado');
});

// 3. Manejo de Errores (Siempre al final)
app.use(manejadorErrores);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});