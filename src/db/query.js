export const CREATE_USER_TABLE =
    `CREATE TABLE IF NOT EXISTS users (
     id SERIAL NOT NULL PRIMARY KEY,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(500) NOT NULL,
     phone_number VARCHAR(20) NOT NULL, 
     address VARCHAR(50) NOT NULL,
     is_admin VARCHAR(50));`;

export const DROP_USER_TABLE =
    `DROP TABLE users`

export const SELECT_ALL_USERS =
    'SELECT * FROM users';

export const SELECT_USER =
    `SELECT * FROM users WHERE email = $1`

export const SAVE_USER =
    `INSERT INTO users 
    (first_name, last_name, email, password, phone_number, address, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;




export const CREATE_PROPERTY_TABLE =
    `CREATE TABLE IF NOT EXISTS properties (
        id SERIAL NOT NULL PRIMARY KEY,
        price INT NOT NULL,
        state VARCHAR(50) NOT NULL, 
        city VARCHAR(50) NOT NULL,
        address VARCHAR(255) NOT NULL,
        type VARCHAR(1024) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        owner INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_on VARCHAR(50) NOT NULL )`;

export const DROP_PROPERTY_TABLE =
    `DROP TABLE properties`;

export const SAVE_PROPERTY = 
    `INSERT INTO properties (price, state, city, address, type, image_url, owner, status, created_on)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

export const SELECT_PROPERTY = 
    `SELECT * FROM properties WHERE type = $1`;

