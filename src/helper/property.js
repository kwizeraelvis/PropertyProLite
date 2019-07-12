import Joi from 'joi';
import _ from "lodash";

const properties = [];

export const validate = (req) => {
  const schema = {
    price: Joi.number().required().min(0),
    state: Joi.string().required().min(1).max(255),
    city: Joi.string().required().min(1).max(255),
    address: Joi.string().required().min(1).max(255),
    type: Joi.string().required().min(1).max(255),
    image_url: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
}

export const strictValidate = (req) => {
  const regex = /^[A-Za-z0-9 ]+$/;

  let keys = Object.keys(req.body);

  for (let key of keys) {
    if (!['price'].includes(key)) {
      if (!regex.test(req.body[`${key}`])) return { error: `${key} should not have special characters` }
      if (!isNaN(req.body[`${key}`])) return { error: `${key} should not be a number` };
    }
  }
}

export const saveProperty = (req) => {
  const property = _.pick(req.body, ['price', 'state', 'city', 'address', 'type', 'image_url']);
  property.id = properties.length + 1;
  property.owner = req.user.id;
  property.status = 'available';
  property.created_on = new Date().toLocaleString();

  properties.push(property);

  return property;
}

export const updatePropertyHelper = (property, req) => {
  const keys = Object.keys(property);
  keys.forEach((key) => {
    if (!['id', 'owner', 'status', 'created_on'].includes(key) && req.body[`${key}`])
      property[`${key}`] = req.body[`${key}`];
  });

  return property;
}

export const deletePropertyHelper = (property) => {
  const index = properties.indexOf(property);
  properties.splice(index, 1);

  property = {};
  property.message = 'Deleted property successfully';

  return property;
}

export { properties };
