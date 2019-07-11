import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const users = [];


export const validateSignup = (req) => {
  const schema = {
    email: Joi.string().required().email(),
    first_name: Joi.string().required().min(1).max(255),
    last_name: Joi.string().required().min(1).max(255),
    password: Joi.string().required().min(6).max(255),
    phoneNumber: Joi.string().required().min(1).max(25),
    address: Joi.string().required().min(1).max(255),
    isAdmin: Joi.boolean(),
  };

  return Joi.validate(req.body, schema);
}

export const validateLogin = (req) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
}

export const generateAuthToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_PRIVATE_KEY);
}

export const validateEmail = (req) => {
  const user = users.find(user => user.email === req.body.email);

  return user;
}

export const validatePassword = async (req, user) => {
  return await bcrypt.compare(req.body.password, user.password);
}

export const hashPassword = async (user) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(user.password, salt);
}

export const save = async (req) => {
  let user = _.pick(req.body, ['first_name', 'last_name', 'email', 'password', 'phoneNumber', 'address', 'isAdmin']);
  user.id = users.length + 1;

  const token = generateAuthToken(user);
  user.token = token;
  
  user.password = await hashPassword(user);

  users.push(user);

  user = _.pick(user, ['token', 'first_name', 'last_name', 'email', 'phoneNumber', 'address', 'isAdmin']);

  return user;
}

export { users };