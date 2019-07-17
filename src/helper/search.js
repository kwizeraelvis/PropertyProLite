import { properties } from './property';
import { users } from './user';
import { pool } from '../startup/pg_db';


export const searchPropertyById = async (property) => {

    const user = await pool.query(`SELECT * FROM users WHERE id = ${property.owner}`);

    const { email, phone_number } = user.rows[0];
    property.owner_email = email;
    property.owner_phone_number = phone_number;

    return property;
}