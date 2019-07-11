import _ from 'lodash';
import { results, SUCCESS, ERROR } from '../helper/result';
import { validateSignup, validateEmail, strictValidate, save } from '../helper/user';

const signup = async (req, res) => {
  let { error } = validateSignup(req);
  if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

  error = strictValidate(req);
  if (error) return res.status(400).send(results(400, ERROR, error)); 

  let user = validateEmail(req);
  if (user) return res.status(400).send(results(400, ERROR, 'user already registered.'));

  user = await save(req);

  res.header('x-auth-token', user.token).send(results(200, SUCCESS, user));
};

export default signup;
