import { validateUpdate } from '../../helper/property';
import { results, ERROR } from '../../helper/result';

export default (req, res, next) => {
    const { error } = validateUpdate(req);
    if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

    req.update = 'update';

    next();
}