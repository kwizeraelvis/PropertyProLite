import _ from 'lodash';
import { results, SUCCESS, ERROR } from '../helper/result';
import { saveProperty, updatePropertyHelper, deletePropertyHelper } from '../helper/property';
import { searchProperties, searchPropertyById } from '../helper/search';
import { pool } from '../startup/pg_db';
import { CREATE_PROPERTY_TABLE } from '../db/query';


export const getAllProperties = async (req, res) => {
  if (req.user) {
    const { rows: properties } = await pool.query(`SELECT * FROM properties`);
    return (properties.length > 0) ? res.send(results(200, SUCCESS, properties)) : res.status(404).send(results(404, ERROR, 'No properties available'));
  }

  const { rows: properties } = await pool.query(`SELECT * FROM properties WHERE status = 'available'`);
  (properties.length > 0) ? res.send(results(200, SUCCESS, properties)) : res.status(404).send(results(404, ERROR, 'No properties available'));
};

export const getMyProperties = async (req, res) => {
  await pool.query(CREATE_PROPERTY_TABLE);
  const properties = await pool.query(`SELECT * FROM properties WHERE owner = ${req.user.id}`);

  (properties.rows.length > 0) ? res.status(200).send(results(200, SUCCESS, properties.rows)) : res.status(400).send(results(404, ERROR, 'Currently you do not have any properties yet :('));
};

export const getPropertyById = async (req, res) => {
  const property = await searchPropertyById(req.property);

  return res.send(results(200, SUCCESS, property));
};

export const postProperty = async (req, res) => {
  const property = await saveProperty(req);
  if (property.error) return res.status(400).send(results(400, ERROR, property.error));

  res.status(201).send(results(201, SUCCESS, property));
};

export const updateProperty = async (req, res) => {
  const property = await updatePropertyHelper(req.property, req);

  res.send(results(200, SUCCESS, property));
};

export const propertySold = async (req, res) => {
  await pool.query(`UPDATE properties SET status = 'sold' WHERE id = ${req.property.id}`);
  const updatedProperty = await pool.query(`SELECT * FROM properties WHERE id = ${req.property.id}`);

  res.send(results(200, SUCCESS, updatedProperty.rows[0]));
};

export const deleteProperty = async (req, res) => {
  const property = await deletePropertyHelper(req.property);

  res.send(results(200, SUCCESS, property));
};
