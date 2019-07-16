import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = 'postgresql://postgres:actionking@localhost:5432/property_pro_lite';
let pool;

if(process.env.NODE_ENV === 'test') {
    pool = new Pool({ connectionString: process.env.DATABASE_TEST });
    // await pool.query('CREATE DATABASE travis_ci_test');
}

if(process.env.NODE_ENV === 'development') {
    pool = new Pool({ connectionString });
}

console.log('the running environment is : ', process.env.NODE_ENV);

export { pool };

