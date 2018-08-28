const athleteLinksService = require("../services/athleteLinks.service");
const responses = require("../models/responses");

module.exports = {
  post: (req, res) => {
    const { userId, linkTitle, link, iconId } = req.body;

    athleteLinksService.post(userId, linkTitle, link, iconId).then(Id => {
      res.status(201).json(Id);
    });
  },

  getAll: (req, res) => {
    athleteLinksService
      .getAll()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: (req, res) => {
    athleteLinksService
      .getById(req.params.id)
      .then(item => {
        res.json(new responses.ItemResponse(item));
      })
      .catch(() => {
        res.status(500).send(err);
      });
  }
};
