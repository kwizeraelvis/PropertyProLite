import { results, ERROR } from '../../helper/result';

export default (req, res, next) => {
  const { is_admin } = req.user;
  if (!is_admin) return res.status(403).send(results(403, ERROR, 'Access denied, you are not an Admin'));

  next();
};
