const coachTagsService = require("../services/coachTags.service");
const responses = require("../models/responses/index");

const post = (req, res) => {
  coachTagsService
    .post(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const del = (req, res) => {
  coachTagsService
    .del(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const getAll = (req, res) => {
  coachTagsService
    .getAll()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const getById = (req, res) => {
  coachTagsService
    .getById(req.params.id)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

module.exports = {
  post,
  del,
  getAll,
  getById
};
