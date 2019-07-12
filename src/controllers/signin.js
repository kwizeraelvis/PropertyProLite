import { results, SUCCESS } from '../helper/result';
import { generateAuthToken } from '../helper/user';
import _ from 'lodash';

const signin = async (req, res) => {
  req.user.token = generateAuthToken(req.user);

  req.user = _.pick(req.user, ['token']);

  res.header('x-auth-token', req.user.token).send(results(200, SUCCESS, req.user));
};

export default signin;
