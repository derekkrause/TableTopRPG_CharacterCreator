const responses = require("../models/responses/index");
const athleteTagsService = require("../services/athleteTags.service");

module.exports = {
  getById: (req, res) => {
    athleteTagsService
      .getById(req)
      .then(item => {
        const r = new responses.ItemsResponse(item);
        res.json(r);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  postTag: (req, res) => {
    const { tagName, athleteUserId } = req.body;

    athleteTagsService
      .postTag(tagName, athleteUserId)
      .then(Id => {
        res.status(201).json(Id);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  deleteTag: (req, res) => {
    athleteTagsService.deleteTag(req).then(() => {
      res.sendStatus(200);
    });
  }
};
