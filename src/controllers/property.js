import _ from 'lodash';
import { results, SUCCESS, ERROR } from '../helper/result';
import { saveProperty, updatePropertyHelper, deletePropertyHelper } from '../helper/property';
import { searchProperties, searchPropertyById } from '../helper/search';


export const getAllProperties = (req, res) => {
  const properties = searchProperties();

  (properties.length > 0) ? res.send(results(200, SUCCESS, properties)) : res.status(404).send(results(404, ERROR, 'No properties available'));
};

export const getPropertyById = (req, res) => {
  const property = searchPropertyById(req.property);

  return res.send(results(200, SUCCESS, property));
};

export const postProperty = async (req, res) => {
  const property = saveProperty(req);

  res.send(results(200, SUCCESS, property));
};

export const updateProperty = async (req, res) => {
  const property = updatePropertyHelper(req.property, req);

  res.send(results(200, SUCCESS, property));
};

export const propertySold = async (req, res) => {
  req.property.status = 'sold';

  res.send(results(200, SUCCESS, req.property));
};

export const deleteProperty = async (req, res) => {
  const property = deletePropertyHelper(req.property);

  res.send(results(200, SUCCESS, property));
};
