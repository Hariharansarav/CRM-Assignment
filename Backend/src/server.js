import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test PostgreSQL database connection
    await pool.query('SELECT NOW();');
    console.log('PostgreSQL connected');

    // Start Express server only if database connection succeeds
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    const errorDetails = error.message || error.errors?.map(e => e.message).join(', ') || error.code || 'Connection refused';
    console.error('Database connection failed. PostgreSQL is unavailable:');
    console.error(`Error: ${errorDetails}`);
    process.exit(1);
  }
}

startServer();
