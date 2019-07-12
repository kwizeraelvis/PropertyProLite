import jwt from 'jsonwebtoken';
import { results, ERROR } from '../../helper/result';


export default (req, res, next) => {
  const token = req.header('x-auth-token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    next();
  }
};
