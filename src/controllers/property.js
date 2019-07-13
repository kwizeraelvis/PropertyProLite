import _ from 'lodash';
import { properties, validate } from '../helper/property';
import { results, SUCCESS, ERROR } from '../helper/result';
import cloudinary from '../startup/cloudinary';
import { saveProperty, updatePropertyHelper, deletePropertyHelper } from '../helper/property';
import { searchProperties, searchPropertiesByType, searchPropertyById } from '../helper/search';


export const getAllProperties = (req, res) => {
  const keys = Object.keys(req.query);
  if (keys.length > 0) {
    const specificProperties = searchPropertiesByType(keys, req);
    return (specificProperties.length > 0)
      ? res.send(results(200, specificProperties))
      : res.status(404).send(results(404, 'Properties with the given type cannot be found'));
  }

  const properties = searchProperties();

  (properties.length > 0) ? res.send(results(200, properties)) : res.status(404).send(results(404, 'No properties available'));
};

export const getPropertyById = (req, res) => {
  let property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(404, 'Property with the given id does not exists'));

  property = searchPropertyById(property);

  return res.send(results(200, property));
};

export const postProperty = async (req, res) => {
  if (req.files) {
    const file = req.files.photo;
    cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) res.status(500).send(err);
      res.send(result);
    });
  } 
  else {
    const { error } = validate(req);
    if (error) return res.status(400).send(results(ERROR, error.details[0].message));

    const property = saveProperty(req);

    res.send(results(SUCCESS, property));
  }
};

export const updateProperty = async (req, res) => {
  let property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(ERROR, 'Property with the given id does not exists'));

  property = updatePropertyHelper(property, req);

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

  property = deletePropertyHelper(property);

  res.send(results(SUCCESS, property));
};
