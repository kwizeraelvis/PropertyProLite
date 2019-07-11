import { results, SUCCESS, ERROR } from '../helper/result';

export default (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).send(results(403, ERROR, 'Access denied, you are not an Admin'));

  next();
};
