import express from 'express';
import signup from '../controllers/signup';
import validateSignup from '../middleware/user/validate_signup';
import strictValidate from '../middleware/user/strict_validate';
import validateEmail from '../middleware/user/validate_email';

const router = express.Router();

router.post('/', [validateSignup, strictValidate, validateEmail ], signup);

export default router;
