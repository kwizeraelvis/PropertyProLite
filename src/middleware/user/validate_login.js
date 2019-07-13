import { validateLogin } from '../../helper/user';
import { results, ERROR } from '../../helper/result';

export default (req, res, next) => {
    const { error } = validateLogin(req);
    if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

    next();
}