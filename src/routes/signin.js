import express from 'express';
import signin from '../controllers/signin';
import validateLogin from '../middleware/user/validate_login';
import validateEmail from '../middleware/user/validate_email_login';
import validatePassword from '../middleware/user/validate_password';
import { results, ERROR } from '../helper/result';

const router = express.Router();

router.post('/', [validateLogin, validateEmail, validatePassword], signin);

router.use('*', (req, res) => {
    if (req.method !== 'POST') return res.status(400).send(results(400, ERROR, { 'message': `Invalid route, use POST instead of ${req.method}` }));
});

export default router;
