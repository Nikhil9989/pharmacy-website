import fs from 'fs';
import path from 'path';
import { pgPool } from '../config/database';

export const initializeDatabase = async () => {
  try {
    // Define the SQL for creating tables
    const sql = `
    -- Products Table
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        sku VARCHAR(50) UNIQUE,
        category_id INTEGER,
        requires_prescription BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Categories Table
    CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        parent_id INTEGER REFERENCES categories(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Inventory Table
    CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL DEFAULT 0,
        threshold_quantity INTEGER DEFAULT 10,
        unit_cost DECIMAL(10, 2),
        unit_price DECIMAL(10, 2),
        batch_number VARCHAR(50),
        expiry_date DATE,
        location VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Inventory Transactions Table
    CREATE TABLE IF NOT EXISTS inventory_transactions (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        transaction_type VARCHAR(50) NOT NULL, -- purchase, sale, adjustment, return
        reference_id VARCHAR(100), -- order ID, supplier invoice, etc.
        notes TEXT,
        user_id VARCHAR(100), -- MongoDB user ID
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Add index on frequently queried fields
    CREATE INDEX IF NOT EXISTS idx_product_category ON products(category_id);
    CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory(product_id);
    CREATE INDEX IF NOT EXISTS idx_inventory_expiry ON inventory(expiry_date);
    CREATE INDEX IF NOT EXISTS idx_transactions_product ON inventory_transactions(product_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_type ON inventory_transactions(transaction_type);
    `;
    
    await pgPool.query(sql);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database schema:', error);
    throw error;
  }
};