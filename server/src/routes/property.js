import express from 'express';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import {
  getAllProperties, getPropertyById, postProperty,
  updateProperty, propertySold, deleteProperty,
} from '../controllers/property';

const router = express.Router();


router.get('/', getAllProperties);

router.post('/', [auth], postProperty);



export default router;
