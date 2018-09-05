const Joi = require("joi");

const schema = {
  email: Joi.string()
    .max(100)
    .required(),
  value: Joi.string().required()
};

module.exports = Joi.object().keys(schema);
