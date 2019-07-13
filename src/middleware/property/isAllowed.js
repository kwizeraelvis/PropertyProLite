import { properties } from '../../helper/property';
import { results, ERROR } from '../../helper/result';

export default (req, res, next) => {
    if(req.property.owner !== req.user.id) 
        return res.status(403).send(results(403, ERROR, 'Access denied, the property is not yours'));

    next();
}