import winston from 'winston';
import { results, ERROR } from '../helper/result';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  winston.error(err.message);

  res.status(500).send(results(500, ERROR, err.message));
};
