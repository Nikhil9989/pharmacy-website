import app from './app';
import { config } from './config/env';
import { initializeDatabase } from './services/database.service';

const PORT = config.PORT || 5000;

// Initialize PostgreSQL database schema
initializeDatabase()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${config.NODE_ENV}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });