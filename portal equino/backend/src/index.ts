import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { limitadorPeticiones } from './middlewares/rate-limit.middleware';
import { manejadorErrores } from './middlewares/error.middleware';
import { auditoriaMiddleware } from './middlewares/audit.middleware';
import ganadoRoutes from './modules/ganado/ganado.routes';
import authRoutes from './modules/auth/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares Globales de Seguridad
app.use(helmet()); // Protege contra vulnerabilidades web comunes
app.use(cors());   // Habilita CORS de forma segura
app.use(express.json());
app.use(limitadorPeticiones);
app.use(auditoriaMiddleware);

// 2. Rutas de Módulos
app.use('/api/auth', authRoutes);
app.use('/api/ganado', ganadoRoutes);

// Health Check y Estado del Sistema
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor de Gestión Ganadera Operativo', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.send('Servidor de Gestion Ganadera Activo y Verificado (Base Sólida)');
});

// 3. Manejo de Errores (Siempre al final)
app.use(manejadorErrores);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});