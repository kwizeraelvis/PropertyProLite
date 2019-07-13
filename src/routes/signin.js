import express from 'express';
import signin from '../controllers/signin';
import validateLogin from '../middleware/user/validate_login';
import validateEmail from '../middleware/user/validate_email_login';
import validatePassword from '../middleware/user/validate_password';

const router = express.Router();

router.post('/', [validateLogin, validateEmail, validatePassword], signin);

export default router;
