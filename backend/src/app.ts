import express, { Application } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import inventoryRoutes from './routes/inventory.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default app;