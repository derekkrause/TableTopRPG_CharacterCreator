const athleteTargetSportService = require("../services/athleteTargetSport.service");
const responses = require("../models/responses");

module.exports = {
  post: (req, res) => {
    const { userId, SportId, SportPositionIdJson, PreferenceOrder } = req.body;
    athleteTargetSportService.post(userId, SportId, SportPositionIdJson, PreferenceOrder).then(Id => {
      res.status(201).json(Id);
    });
  },

  getById: (req, res) => {
    athleteTargetSportService
      .getById(req.params.id)
      .then(item => {
        res.json(new responses.ItemResponse(item));
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
