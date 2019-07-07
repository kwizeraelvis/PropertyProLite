import Joi from 'joi';
import bcrypt from 'bcrypt';
import { users, generateAuthToken } from '../models/user';
import { results, SUCCESS, ERROR } from '../helper/result';


function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
}

const signin = async (req, res) => {
  const { error } = validate(req);
  if (error) return res.status(400).send(results(ERROR, error.details[0].message));

  const user = users.find(user => user.email === req.body.email);
  if (!user) return res.status(400).send(results(ERROR, 'Invalid email'));

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send(results(ERROR, 'Invalid password'));

 
};

export default signin;
