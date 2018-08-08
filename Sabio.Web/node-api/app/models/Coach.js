const Joi = require("joi");

const coachSchema = {
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  title: Joi.string()
    .max(250)
    .allow(null)
    .required(),
  schoolId: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .required(),
  shortBio: Joi.string()
    .max(500)
    .allow(null)
    .required()
};

module.exports = Joi.object().keys(coachSchema);
