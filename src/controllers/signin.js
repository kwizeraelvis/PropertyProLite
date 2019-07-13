import bcrypt from 'bcrypt';
import { results, SUCCESS, ERROR } from '../helper/result';
import { generateAuthToken, validateLogin, validateEmail } from '../helper/user';

const signin = async (req, res) => {
  const { error } = validateLogin(req);
  if (error) return res.status(400).send(results(ERROR, error.details[0].message));

  const user = validateEmail(req);
  if (!user) return res.status(400).send(results(ERROR, 'Invalid email'));

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send(results(ERROR, 'Invalid password'));

  const token = generateAuthToken(user);
  user.token = token;

  res.header('x-auth-token', token).send(results(SUCCESS, user));
};

export default signin;
