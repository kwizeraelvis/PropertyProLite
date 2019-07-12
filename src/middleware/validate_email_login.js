import { users } from '../helper/user';
import { results, ERROR } from '../helper/result';

export default (req, res, next) => {
    const user = users.find(user => user.email === req.body.email);
    if (!user) return res.status(400).send(results(400, ERROR, 'Invalid email'));

    req.user = user;

    next();
}