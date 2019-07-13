import express from 'express';
import auth from '../middleware/user/auth';
import admin from '../middleware/user/admin';
import {
  getAllProperties, getMyProperties, getPropertyById, postProperty,
  updateProperty, propertySold, deleteProperty,
} from '../controllers/property';

import validate from '../middleware/property/validate';
import strictValidate from '../middleware/property/strict_validate';
import searchProperty from '../middleware/property/search_property';
import checkPropertyId from '../middleware/property/check_property_id';
import upload from '../middleware/property/upload';
import validateUpdate from '../middleware/property/validate_update';
import authProperty from '../middleware/property/auth';
import isOwner from '../middleware/property/isOwner';

const router = express.Router();


router.get('/', [authProperty, searchProperty], getAllProperties);

router.get('/me', [auth], getMyProperties);

router.get('/:id', [checkPropertyId], getPropertyById);

router.post('/', [auth, validate, strictValidate, upload ], postProperty);

router.patch('/:id', [auth, validateUpdate, strictValidate, checkPropertyId, isOwner], updateProperty);

router.patch('/:id/sold', [auth, checkPropertyId, isOwner], propertySold);

router.delete('/:id', [auth, admin, checkPropertyId, isOwner], deleteProperty);

export default router;
