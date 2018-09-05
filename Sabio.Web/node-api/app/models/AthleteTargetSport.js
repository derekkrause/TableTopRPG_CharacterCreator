const Joi = require("joi");

const AthleteTargetSportSchema = {
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  sportId: Joi.number()
    .integer()
    .positive()
    .required(),
  sportPositionIdJson: Joi.string().required()
};

const AthleteTargetSportUpdateSchema = {
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  sportId: Joi.number()
    .integer()
    .positive()
    .required(),
  sportPositionIdJson: Joi.string().required(),
  id: Joi.number()
    .integer()
    .positive()
    .required()
};

module.exports = Joi.object().keys(AthleteTargetSportSchema, AthleteTargetSportUpdateSchema);
