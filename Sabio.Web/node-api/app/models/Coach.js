const Joi = require("joi");

const coachSchema = {
  userId: Joi.number()
    .integer()
    .positive()
    .required()
};

module.exports = Joi.object().keys(coachSchema);
