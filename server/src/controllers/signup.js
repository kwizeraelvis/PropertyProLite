import bcrypt from 'bcrypt';
import _ from 'lodash';
import { users, validate, generateAuthToken } from '../models/user';
import { results, SUCCESS, ERROR } from '../helper/result';

const signup = async (req, res) => {
  res.send('it is working');
};

export default signup;
