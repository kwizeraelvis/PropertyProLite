import _ from 'lodash';
import { results, SUCCESS, ERROR } from '../helper/result';
import { save } from '../helper/user';

const signup = async (req, res) => {

  const user = await save(req);

  res.header('x-auth-token', user.token).send(results(201, SUCCESS, user));
};

export default signup;
