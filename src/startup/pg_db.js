import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if(process.env.NODE_ENV === 'test') {
    pool = new Pool({ connectionString: process.env.DATABASE_TEST });
}

if(process.env.NODE_ENV === 'development') {
    pool = new Pool({ connectionString: process.env.DATABASE_DEVELOPMENT });
}

if(process.env.NODE_ENV === 'production') {
    pool = new Pool({ connectionString: process.env.DATABASE_PRODUCTION });
}

console.log('the running environment is : ', process.env.NODE_ENV);

export { pool };

