const Joi = require("joi");

const conferenceSchema = {
  code: Joi.string()
    .max(20)
    .required(),
  name: Joi.string()
    .max(100)
    .required(),
  displayOrder: Joi.number()
    .integer()
    .positive()
    .required(),
  inactive: Joi.boolean().required(),
  link: Joi.string().max(250),
  logo: Joi.string().max(250),
  schoolTypeId: Joi.number()
    .integer()
    .positive()
    .required()
};

module.exports = Joi.object().keys(conferenceSchema);
