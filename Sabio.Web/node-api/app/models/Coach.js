const Joi = require("joi");

const coachSchema = {
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  title: Joi.string()
    .max(250)
    .required(),
  schoolId: Joi.number()
    .integer()
    .positive()
    .required(),
  shortBio: Joi.string()
    .max(500)
    .required()
};

module.exports = Joi.object().keys(coachSchema);
