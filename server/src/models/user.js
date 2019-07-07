import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'config';

const users = [];


function validate(req) {
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

function generateAuthToken(user) {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.get('jwtPrivateKey'));
}

export { users, validate, generateAuthToken };
