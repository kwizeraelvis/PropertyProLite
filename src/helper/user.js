import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { pool } from '../startup/pg_db';
import { CREATE_TABLE, SAVE_USER, SELECT_USER } from '../db/query';

const users = [];


export const validateSignup = (req) => {
  const schema = {
    email: Joi.string().required().email(),
    first_name: Joi.string().required().min(1).max(255),
    last_name: Joi.string().required().min(1).max(255),
    password: Joi.string().required().min(6).max(255),
    phoneNumber: Joi.number().required(),
    address: Joi.string().required().min(1).max(255),
    isAdmin: Joi.boolean(),
  };

  return Joi.validate(req.body, schema);
}

export const strictValidate = (req) => {
  const regex = /^[A-Za-z0-9 ]+$/;

  let keys = Object.keys(req.body);

  for (let key of keys) {
    if (!['email', 'password', 'phoneNumber', 'isAdmin'].includes(key)) {
      if (!regex.test(req.body[`${key}`])) return { error: `${key} should not have special characters` }
      if (!isNaN(req.body[`${key}`])) return { error: `${key} should not be a number` };
    }
  }

  if(req.body.phoneNumber.length < 10 || req.body.phoneNumber.length > 15) 
      return { error: 'phone number should be greater than 10 or less than 15' };
}

export const validateLogin = (req) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
}

export const generateAuthToken = (user) => {
  return jwt.sign({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
    }, process.env.JWT_PRIVATE_KEY);
}

export const hashPassword = async (user) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(user.password, salt);
}

export const save = async (req) => {
  let user = _.pick(req.body, ['first_name', 'last_name', 'email', 'password', 'phoneNumber', 'address', 'isAdmin']);

  user.password = await hashPassword(user);

  // await pool.query('DROP TABLE users');
  await pool.query(CREATE_TABLE);
  await pool.query(SAVE_USER, 
    [user.first_name, user.last_name, user.email, user.password, user.phoneNumber,
    user.address, user.isAdmin]);

  const savedUser = await pool.query(SELECT_USER, [user.email]);
  
  const token = generateAuthToken(user);
  savedUser.rows[0].token = token;
  
  return _.pick(savedUser.rows[0], ['token']);
}

export const assign = (user, userMock) => {
  const keys = Object.keys(userMock);
  for(let key of keys) {
    user[`${key}`] = userMock[`${key}`];
  }

  return user;
}

export { users };
