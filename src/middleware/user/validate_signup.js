import { validateSignup } from '../../helper/user';
import { results, ERROR } from '../../helper/result';

export default (req, res, next) => {
    let { error } = validateSignup(req);
    if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

    next();
}