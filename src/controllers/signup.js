import bcrypt from 'bcrypt';
import _ from 'lodash';
import { results, SUCCESS, ERROR } from '../helper/result';
import { users, validateSignup, generateAuthToken, validateEmail, save, validatePassword, hashPassword } from '../helper/user';

const signup = async (req, res) => {
  const { error } = validateSignup(req);
  if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

  let user = validateEmail(req);
  if (user) return res.status(400).send(results(400, ERROR, 'user already registered.'));

  user = await save(req);

  res.header('x-auth-token', user.token).send(results(200, SUCCESS, user));
};

export default signup;
