import { Pool } from 'pg';

const connectionString = 'postgressql://postgres:actionking@localhost:5432/property_pro_lite';
const pool = new Pool({ connectionString });

export { pool };

