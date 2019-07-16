import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = 'postgressql://postgres:actionking@localhost:5432/property_pro_lite';
let pool;

if(process.env.NODE_ENV === 'test') {
    pool = new Pool({ connectionString: process.env.DATABASE_TEST });
}

if(process.env.NODE_ENV === 'development') {
    pool = new Pool({ connectionString });
}


export { pool };

