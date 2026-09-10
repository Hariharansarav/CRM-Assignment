import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const { Pool } = pg;

const isRemote = process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1';
const useSSL = process.env.DB_SSL === 'true' || (process.env.DB_SSL !== 'false' && isRemote);

const baseConfig = {
  max: process.env.DB_POOL_MAX ? Number(process.env.DB_POOL_MAX) : 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};

const poolConfig = process.env.DATABASE_URL
  ? {
      ...baseConfig,
      connectionString: process.env.DATABASE_URL,
      ssl: useSSL ? { rejectUnauthorized: false } : false,
    }
  : {
      ...baseConfig,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: useSSL ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected idle PostgreSQL client error:', err.message || err);
});

export { pool };
export default pool;
