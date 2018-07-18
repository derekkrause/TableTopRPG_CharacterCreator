const Joi = require("joi");

const schema = {
  id: Joi.number(),
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  country: Joi.string()
    .min(2)
    .max(50),
  startDate: Joi.date(),
  points: Joi.number()
    .min(0)
    .max(999),
  inactive: Joi.boolean(),
  url: Joi.string()
};

module.exports = Joi.object().keys(schema);
