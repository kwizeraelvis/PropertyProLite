import { results, ERROR } from '../../helper/result';
import bcrypt from 'bcrypt';

export default async (req, res, next) => {
    const isValid =  await bcrypt.compare(req.body.password, req.user.password);
    
    if (!isValid) return res.status(400).send(results(400, ERROR, 'Invalid password'));
    
    next();
}