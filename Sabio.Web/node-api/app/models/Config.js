const Joi = require("joi");

const schema = {
  id: Joi.number().allow(""),
  key: Joi.string()
    .max(50)
    .required(),
  value: Joi.string().required()
};

module.exports = Joi.object().keys(schema);
