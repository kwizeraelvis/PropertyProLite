import Joi from 'joi';
import bcrypt from 'bcrypt';
import { users, generateAuthToken } from '../models/user';
import { results, SUCCESS, ERROR } from '../helper/result';


const signin = async (req, res) => {
  res.send('it is working')
};

export default signin;
