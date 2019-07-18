import Joi from 'joi';
import _ from "lodash";
import isUrl from 'is-url';
import { pool } from '../startup/pg_db';
import { SAVE_PROPERTY, CREATE_PROPERTY_TABLE, SELECT_PROPERTY } from '../db/query'

const properties = [];

export const validate = (req) => {
  const schema = {
    price: Joi.number().required().min(1000),
    state: Joi.string().required().min(1).max(255),
    city: Joi.string().required().min(1).max(255),
    address: Joi.string().required().min(1).max(255),
    type: Joi.string().required().min(1).max(255),
    image_url: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
}

export const strictValidate = (req) => {
  const regex = /^[A-Za-z0-9 ]+$/;
  let keys = Object.keys(req.body);

  for (let key of keys) {
    if (!['price', 'image_url'].includes(key)) {
      if (!regex.test(req.body[`${key}`])) return { error: `${key} should not have special characters` }
      if (!isNaN(req.body[`${key}`])) return { error: `${key} should not be a number` };
    }
  }

  if(/\d/.test(req.body.state)) return { error: 'state should not contain numbers' }
  if(/\d/.test(req.body.city)) return { error: 'city should not contain numbers' }


  if (req.update) {
    if(req.body.image_url) {
      if (!isUrl(req.body.image_url)) return { error: 'the url is invalid' }; 
    }
  }
  else {
    if (!isUrl(req.body.image_url)) return { error: 'the url is invalid' };
  } 


  if(req.body.type) {
    for(let property of properties) {
      if(property.type == req.body.type) {
        return { error: 'the house already exits' };
      } 
    }
  }
}

export const validateUpdate = (req) => {
  const schema = {
    price: Joi.number().min(1000),
    state: Joi.string().min(1).max(255),
    city: Joi.string().min(1).max(255),
    address: Joi.string().min(1).max(255),
    type: Joi.string().min(1).max(255),
    image_url: Joi.string()
  }

  return Joi.validate(req.body, schema);
}

export const saveProperty = async (req) => {
  const property = _.pick(req.body, ['price', 'state', 'city', 'address', 'type', 'image_url']);
  property.owner = req.user.id;
  property.status = 'available';
  property.created_on = new Date().toLocaleString();

  await pool.query(CREATE_PROPERTY_TABLE);
  
  let savedProperty = await pool.query(`SELECT * FROM properties WHERE type = '${property.type}' AND address = '${property.address}'`);
  if(savedProperty.rows.length !== 0) return { error: 'The house already exists' };

  await pool.query(SAVE_PROPERTY, [property.price, property.state, property.city, property.address, property.type, property.image_url, property.owner, property.status, property.created_on]);
  savedProperty = await pool.query(SELECT_PROPERTY, [property.type]);

  return savedProperty.rows[0];
}

export const updatePropertyHelper = async (property, req) => {
  const keys = Object.keys(property);

  let value;
  for(let key of keys) {
    if (!['id', 'owner', 'status', 'created_on'].includes(key) && req.body[`${key}`]) {
      value = req.body[`${key}`];
      await pool.query(`UPDATE properties SET ${key} = '${value}'  WHERE id = ${property.id}`);
    }
  }

  const updatedProperty = await pool.query(`SELECT * FROM properties WHERE id = ${property.id}`);
  
  return updatedProperty.rows[0];  
}

export const deletePropertyHelper = async (property) => {
  await pool.query(`DELETE FROM properties WHERE id = ${property.id}`);

  property = {};
  property.message = 'Deleted property successfully';

  return property;
}

export { properties };
