import { properties } from './property';
import { users } from './user';
import { pool } from '../startup/pg_db';


export const searchPropertiesByType = (keys, req) => {
    const specificProperties = [];
    let isValid = false;

    properties.forEach((property) => {
        for (let i = 0; i < keys.length; i++) {
            if ((property[`${keys[i]}`].toString()) === req.query[`${keys[i]}`]) isValid = true;
            else { isValid = false; break; }
        }

        if (isValid) specificProperties.push(property);
    });

    return specificProperties;
}

export const searchProperties = (user) => {

    if (user) {
        for (let property of properties) {
            const { email, phoneNumber } = users.find(user => user.id === property.owner);
            property.ownerEmail = email;
            property.ownerPhoneNumber = phoneNumber;
        }

        return properties;
    }
    else {
        const freshProperties = [];
        freshProperties.length = 0;

        for (let property of properties) {
            if (property.status == 'available')
                freshProperties.push(property);
        }

        return freshProperties;
    }
}

export const searchPropertyById = async (property) => {

    const user = await pool.query(`SELECT * FROM users WHERE id = ${property.owner}`);

    const { email, phone_number } = user.rows[0];
    property.owner_email = email;
    property.owner_phone_number = phone_number;

    return property;
}

export const searchMyProperties = (user) => {
    const myProperties = [];
    myProperties.length = 0;

    for (let property of properties) {
        if (property.owner === user.id) {
            myProperties.push(property);
        }
    }

    return myProperties;
}