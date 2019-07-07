import _ from 'lodash';
import { users } from '../models/user';
import { properties, validate } from '../models/property';
import { results, SUCCESS, ERROR } from '../helper/result';
import cloudinary from '../startup/cloudinary';


export const getAllProperties = (req, res) => {
  const keys = Object.keys(req.query);

  if (keys.length > 0) {
    const specificProperties = [];
    let isValid = false;

    properties.forEach(property => {
      for (let i = 0; i < keys.length; i++) {
        if ((property[`${keys[i]}`].toString()) === req.query[`${keys[i]}`]) isValid = true;
        else { isValid = false; break; };
      }

      if (isValid) specificProperties.push(property);
    });

    return (specificProperties.length > 0) ? res.status(200).send(results(200, specificProperties)) : res.status(404).send(results(404, 'Properties with the given type cannot be found'));
  }

  properties.forEach((property) => {
    const { email, phoneNumber } = users.find(user => user.id === property.owner);
    property.ownerEmail = email;
    property.ownerPhoneNumber = phoneNumber;
  });

  (properties.length > 0) ? res.send(results(200, properties)) : res.status(404).send(results(404, 'No properties available'));
};

export const getPropertyById = (req, res) => {
  res.send('it is working as intended');
};

export const postProperty = async (req, res) => {
  if (req.files) {
    const file = req.files.photo;
    cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
      (result) ? console.log(result) : console.log('error during upload is : ', err);
    });
  }

  const { error } = validate(req);
  if (error) return res.status(400).send(results(ERROR, error.details[0].message));

  const property = _.pick(req.body, ['price', 'state', 'city', 'address', 'type', 'image_url']);
  property.id = properties.length + 1;
  property.owner = req.user.id;
  property.status = 'available';
  property.created_on = new Date().toLocaleString();

  properties.push(property);

  res.send(results(SUCCESS, property));
};
