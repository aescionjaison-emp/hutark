import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes';
import { seedDatabase } from './services/seed.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Root Welcome Endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to HUTARK Embodied AI REST API Service',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      news: '/api/news',
      contact: '/api/contact (POST)',
      events: '/api/events/register (POST)'
    }
  });
});

app.listen(PORT, async () => {
  console.log(`[HUTARK Backend] Server running on http://localhost:${PORT}`);
  try {
    await seedDatabase();
  } catch (err: any) {
    console.warn('[HUTARK Backend] Auto-seed warning:', err.message);
  }
});

