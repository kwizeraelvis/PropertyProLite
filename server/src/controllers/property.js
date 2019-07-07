import _ from 'lodash';
import { users } from '../models/user';
import { properties, validate } from '../models/property';
import { results, SUCCESS, ERROR } from '../helper/result';
import cloudinary from '../startup/cloudinary';



export const postProperty = async (req, res) => {
  res.send('it is really working brozzay');
};
