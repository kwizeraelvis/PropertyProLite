import express from 'express';
import signin from '../controllers/signin';
import validateLogin from '../middleware/validate_login';
import validateEmail from '../middleware/validate_email_login';
import validatePassword from '../middleware/validate_password';

const router = express.Router();

router.post('/', [validateLogin, validateEmail, validatePassword], signin);

export default router;
