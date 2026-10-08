import { Pool, type QueryConfig } from 'pg';

import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});

pool.on('error', error => {
    console.error('Unexpected PostgreSQL pool error:', error);
});

export const query = (text: string, params?: QueryConfig['values']) => {
    return pool.query(text, params);
};

export default pool;
