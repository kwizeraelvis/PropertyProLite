import bcrypt from 'bcrypt';
import _ from 'lodash';
import { users, validate, generateAuthToken } from '../models/user';
import { results, SUCCESS, ERROR } from '../helper/result';

const signup = async (req, res) => {
  const { error } = validate(req);
  if (error) return res.status(400).send(results(ERROR, error.details[0].message));

  let user = users.find(user => user.email === req.body.email);
  if (user) return res.status(400).send(results(ERROR, 'user already registered.'));


};

export default signup;
