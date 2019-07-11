import _ from 'lodash';
import { properties, validate } from '../helper/property';
import { results, SUCCESS, ERROR } from '../helper/result';
import cloudinary from '../startup/cloudinary';
import { saveProperty, updatePropertyHelper, deletePropertyHelper, strictValidate } from '../helper/property';
import { searchProperties, searchPropertiesByType, searchPropertyById } from '../helper/search';


export const getAllProperties = (req, res) => {
  const keys = Object.keys(req.query);
  if (keys.length > 0) {
    const specificProperties = searchPropertiesByType(keys, req);
    return (specificProperties.length > 0)
      ? res.send(results(200, SUCCESS, specificProperties))
      : res.status(404).send(results(404, ERROR, 'Properties with the given type cannot be found'));
  }

  const properties = searchProperties();

  (properties.length > 0)
    ? res.send(results(200, SUCCESS, properties))
    : res.status(404).send(results(404, ERROR, 'No properties available'));
};

export const getPropertyById = (req, res) => {
  let property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(404, ERROR, 'Property with the given id does not exists'));

  property = searchPropertyById(property);

  return res.send(results(200, SUCCESS, property));
};

export const postProperty = async (req, res) => {
  if (req.files) {
    const file = req.files.photo;
    cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) res.status(500).send(results(500, ERROR, err));
      res.send(results(200, SUCCESS, result));
    });
  }
  else {
    let { error } = validate(req);
    if (error) return res.status(400).send(results(400, ERROR, error.details[0].message));

    error = strictValidate(req);
    if (error) return res.status(400).send(results(400, ERROR, error));

    const property = saveProperty(req);

    res.send(results(200, SUCCESS, property));
  }
};

export const updateProperty = async (req, res) => {
  let property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(404, ERROR, 'Property with the given id does not exists'));

  const error = strictValidate(req);
  if (error) return res.status(400).send(results(400, ERROR, error));

  property = updatePropertyHelper(property, req);

  res.send(results(200, SUCCESS, property));
};

export const propertySold = async (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(404, ERROR, 'Property with the given id does not exists'));

  property.status = 'sold';

  res.send(results(200, SUCCESS, property));
};

export const deleteProperty = async (req, res) => {
  let property = properties.find(p => p.id === parseInt(req.params.id, 10));
  if (!property) return res.status(404).send(results(404, ERROR, 'Property with the given id does not exists'));

  property = deletePropertyHelper(property);

  res.send(results(200, SUCCESS, property));
};
