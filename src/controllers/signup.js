import bcrypt from 'bcrypt';
import _ from 'lodash';
import { users, validateSignup, generateAuthToken } from '../helper/user';
import { results, SUCCESS, ERROR } from '../helper/result';

const signup = async (req, res) => {
  const { error } = validateSignup(req);
  if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

  let user = users.find(user => user.email === req.body.email);
  if (user) return res.status(400).send(results(400, ERROR, 'user already registered.'));

  user = _.pick(req.body, ['first_name', 'last_name', 'email', 'password', 'phoneNumber', 'address', 'isAdmin']);
  user.id = users.length + 1;

  const token = generateAuthToken(user);
  user.token = token;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  users.push(user);

  res.header('x-auth-token', token).send(results(200, SUCCESS, user));
};

export default signup;
