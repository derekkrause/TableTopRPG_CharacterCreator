const Joi = require("joi");

const schema = {
  id: Joi.number().allow(""),
  oldPassword: Joi.string()
  .required(),
  newPassword: Joi.string()
  .required()
};

module.exports = Joi.object().keys(schema);
