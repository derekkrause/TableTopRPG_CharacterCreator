const coachAthleteLogService = require("../services/coachAthleteLog.service");
const responses = require("../models/responses/index");

const post = (req, res) => {
  coachAthleteLogService
    .post(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const del = (req, res) => {
  coachAthleteLogService
    .del(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(response);
    });
};

const getById = (req, res) => {
  coachAthleteLogService
    .getById(req.params.id, req.params.athleteId)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const put = (req, res) => {
  coachAthleteLogService
    .put(req.body, req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

module.exports = {
  post,
  put,
  del,
  getById
};
