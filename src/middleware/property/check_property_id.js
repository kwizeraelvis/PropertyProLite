import { properties } from '../../helper/property';
import { results, ERROR } from '../../helper/result';

export default (req, res, next) => {
    const property = properties.find(p => p.id === parseInt(req.params.id, 10));
    if (!property) return res.status(404).send(results(404, ERROR, 'Property with the given id does not exists'));

    req.property = property;

    next();
}