const Joi = require("joi");

const AthleteTargetSportSchema = {
  userId: Joi.number()
    .integer()
    .positive()
    .required()
};

module.exports = Joi.object().keys(AthleteTargetSportSchema);
