import express from 'express';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import {
  getAllProperties, getPropertyById, postProperty,
  updateProperty, propertySold, deleteProperty,
} from '../controllers/property';

const router = express.Router();


router.get('/', getAllProperties);

router.get('/:id', getPropertyById);

router.post('/', [auth], postProperty);

router.patch('/:id', auth, updateProperty);

router.patch('/:id/sold', auth, propertySold);



export default router;
