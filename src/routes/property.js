import express from 'express';
import auth from '../middleware/user/auth';
import admin from '../middleware/user/admin';
import {
  getAllProperties, getPropertyById, postProperty,
  updateProperty, propertySold, deleteProperty,
} from '../controllers/property';

import validate from '../middleware/property/validate';
import strictValidate from '../middleware/property/strict_validate';
import searchProperty from '../middleware/property/search_property';
import checkPropertyId from '../middleware/property/check_property_id';

const router = express.Router();


router.get('/', [searchProperty], getAllProperties);

router.get('/:id', [checkPropertyId], getPropertyById);

router.post('/', [auth, validate, strictValidate ], postProperty);

router.patch('/:id', [auth, strictValidate, checkPropertyId], updateProperty);

router.patch('/:id/sold', [auth, checkPropertyId], propertySold);

router.delete('/:id', [auth, admin, checkPropertyId], deleteProperty);

export default router;
