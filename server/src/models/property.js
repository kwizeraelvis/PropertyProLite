import Joi from 'joi';

const properties = [];

function validate(req) {
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

export { properties, validate };
