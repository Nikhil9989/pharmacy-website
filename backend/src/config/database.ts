import mongoose from 'mongoose';
import { Pool } from 'pg';
import { config } from './env';

// MongoDB connection
export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// PostgreSQL connection pool
export const pgPool = new Pool({
  user: config.POSTGRES_USER,
  host: config.POSTGRES_HOST,
  database: config.POSTGRES_DB,
  password: config.POSTGRES_PASSWORD,
  port: parseInt(config.POSTGRES_PORT || '5432'),
});

pgPool.on('connect', () => {
  console.log('PostgreSQL connected successfully');
});

pgPool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err);
});