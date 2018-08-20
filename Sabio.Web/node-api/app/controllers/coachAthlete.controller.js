const coachAthleteService = require("../services/coachAthlete.service");
const responses = require("../models/responses/index");

const del = (req, res) => {
  coachAthleteService
    .del(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const put = (req, res) => {
  coachAthleteService
    .put(req.body, req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const post = (req, res) => {
  coachAthleteService
    .post(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getAll = (req, res) => {
  coachAthleteService
    .getAll()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const getById = (req, res) => {
  coachAthleteService
    .getById(req.params.id)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  post,
  del,
  put,
  getAll,
  getById
};
