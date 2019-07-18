import express from 'express';
import signup from '../controllers/signup';
import validateSignup from '../middleware/user/validate_signup';
import strictValidate from '../middleware/user/strict_validate';
import validateEmail from '../middleware/user/validate_email';
import { results, ERROR } from '../helper/result';

const router = express.Router();

router.post('/', [validateSignup, strictValidate, validateEmail ], signup);

router.use('*', (req, res) => {
    if (req.method !== 'POST') return res.status(400).send(results(400, ERROR, `Invalid route, use POST instead of ${req.method}`));
});

export default router;
