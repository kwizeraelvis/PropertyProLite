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

    properties.forEach((property) => {
      for (let i = 0; i < keys.length; i++) {
        if ((property[`${keys[i]}`].toString()) === req.query[`${keys[i]}`]) isValid = true;
        else { isValid = false; break; }
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
  const property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(404, 'Property with the given id does not exists'));

  const { email, phoneNumber } = users.find(user => user.id === property.owner);
  property.ownerEmail = email;
  property.ownerPhoneNumber = phoneNumber;

  return res.send(results(200, property));
};

export const postProperty = async (req, res) => {
  if (req.files) {
    const file = req.files.photo;
    cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) res.status(500).send(err);
      res.send(result);
    });
  } else {
    const { error } = validate(req);
    if (error) return res.status(400).send(results(ERROR, error.details[0].message));

    const property = _.pick(req.body, ['price', 'state', 'city', 'address', 'type', 'image_url']);
    property.id = properties.length + 1;
    property.owner = req.user.id;
    property.status = 'available';
    property.created_on = new Date().toLocaleString();

    properties.push(property);

    res.send(results(SUCCESS, property));
  }
};

export const updateProperty = async (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(ERROR, 'Property with the given id does not exists'));

  const keys = Object.keys(property);
  keys.forEach((key) => {
    if (!['id', 'owner', 'status', 'created_on'].includes(key) && req.body[`${key}`]) property[`${key}`] = req.body[`${key}`];
  });

  res.send(results(SUCCESS, property));
};

export const propertySold = async (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(ERROR, 'Property with the given id does not exists'));

  property.status = 'sold';

  res.send(results(SUCCESS, property));
};

export const deleteProperty = async (req, res) => {
  let property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(ERROR, 'Property with the given id does not exists'));

  const index = properties.indexOf(property);
  properties.splice(index, 1);

  property = {};
  property.message = 'Deleted property successfully';

  res.send(results(SUCCESS, property));
};
