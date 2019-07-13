import { searchPropertiesByType } from '../../helper/search';
import { results, SUCCESS, ERROR } from '../../helper/result';

export default (req, res, next) => {
    const keys = Object.keys(req.query);

    if (keys.length > 0) {
        const specificProperties = searchPropertiesByType(keys, req);
        if (specificProperties) return (specificProperties.length > 0)
            ? res.send(results(200, SUCCESS, specificProperties))
            : res.status(404).send(results(404, ERROR, 'Properties with the given type cannot be found'));
    }

    next();
}