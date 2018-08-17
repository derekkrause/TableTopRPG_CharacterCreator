const Joi = require("joi");

const schema = {
  id: Joi.number().allow(""),
  name: Joi.string()
    .min(2)
    .max(100)
    .required(),
  street: Joi.string().allow(""),
  suite: Joi.string().allow(""),
  city: Joi.string().allow(""),
  state: Joi.string().allow(""),
  zip: Joi.string().allow(""),
  radius: Joi.number().allow(""),
  lat: Joi.number().allow(""),
  lon: Joi.number().allow(""),
  websiteUrl: Joi.string().allow(""),
  logo: Joi.string().allow(""),
  inactive: Joi.boolean(),
  description: Joi.string()
    .min(2)
    .max(250)
};

module.exports = Joi.object().keys(schema);
