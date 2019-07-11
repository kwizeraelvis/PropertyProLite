import bcrypt from 'bcrypt';
import { results, SUCCESS, ERROR } from '../helper/result';
import { generateAuthToken, validateLogin, validateEmail, validatePassword } from '../helper/user';

const signin = async (req, res) => {
  const { error } = validateLogin(req);
  if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

  const user = validateEmail(req);
  if (!user) return res.status(400).send(results(400, ERROR, 'Invalid email'));

  const isValid = await validatePassword(req, user);
  if (!isValid) return res.status(400).send(results(400, ERROR, 'Invalid password'));

  const token = generateAuthToken(user);
  user.token = token;

  res.header('x-auth-token', token).send(results(200, SUCCESS, user));
};

export default signin;
