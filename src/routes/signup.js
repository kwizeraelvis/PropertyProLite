import express from 'express';
import signup from '../controllers/signup';
import validateSignup from '../middleware/validate_signup';
import strictValidate from '../middleware/strict_validate';
import validateEmail from '../middleware/validate_email';

const router = express.Router();

router.post('/', [validateSignup, strictValidate, validateEmail], signup);

export default router;
