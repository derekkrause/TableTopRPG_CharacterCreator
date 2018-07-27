const Joi = require("joi");

const coachSchema = {
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  title: Joi.string()
    .max(250)
    .allow(null),
  schoolId: Joi.number()
    .integer()
    .positive()
    .allow(null),
  shortBio: Joi.string()
    .max(500)
    .allow(null)
};

module.exports = Joi.object().keys(coachSchema);
