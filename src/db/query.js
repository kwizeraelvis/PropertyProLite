export const CREATE_TABLE =
`CREATE TABLE IF NOT EXISTS users (
     id SERIAL NOT NULL PRIMARY KEY,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(500) NOT NULL,
     phone_number VARCHAR(20) NOT NULL, 
     address VARCHAR(50) NOT NULL,
     is_admin VARCHAR(50));`;

export const SELECT_ALL_USERS =
    'SELECT * FROM users';

export const SELECT_USER = 
    `SELECT * FROM users WHERE email = $1`

export const SAVE_USER = 
`INSERT INTO users 
    (first_name, last_name, email, password, phone_number, address, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;