const router = require("express").Router();
const configService = require("../services/config.service");
const responses = require("../models/responses/index");

const getAll = (req, res) => {
  configService
    .getAll()
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getById = (req, res) => {
  configService
    .getById(req.params.id)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.status(500).sent(err);
    });
};

const getByKey = (req, res) => {
  configService
    .getByKey(req.params.key)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const post = (req, res) => {
  configService
    .post(req.model)
    .then(outputParams => {
      res.status(201).json(outputParams);
    })
    .catch(err => {
      console.log(err);
      if (err.number == 2601) {
        res.status(400).json(new responses.ErrorResponse("Duplicate item"));
      } else {
        res.status(500).send(err);
      }
    });
};

const put = (req, res) => {
  configService
    .put(req.model)
    .then(response => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
      if (err.number == 2601) {
        res.status(400).json(new responses.ErrorResponse("Duplicate item"));
      } else {
        res.status(500).send(err);
      }
    });
};

const del = (req, res) => {
  configService
    .del(req.params.id)
    .then(response => {
      res.status(200);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  getAll,
  getById,
  getByKey,
  post,
  put,
  del
};
