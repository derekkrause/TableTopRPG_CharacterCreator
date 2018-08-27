const router = require("express").Router();
const venuesService = require("../services/venues.service");
const responses = require("../models/responses/index");

const getAll = (req, res) => {
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 24;
  venuesService
    .getAll(pageIndex, pageSize)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getById = (req, res) => {
  venuesService
    .getById(req.params.id)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const search = (req, res) => {
  const searchString = req.query.q || "";
  const pageIndex = req.query.pageIndex || 0;
  const pageSize = req.query.pageSize || 10;
  const radius = req.query.radius || null;
  const lat = req.query.lat || null;
  const lon = req.query.lon || null;

  venuesService
    .search(searchString, pageIndex, pageSize, radius, lat, lon)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const post = (req, res) => {
  venuesService
    .post(req.model)
    .then(outputParams => {
      res.status(201).json(outputParams);
    })
    .catch(err => {
      console.log(err);
      if (err.number == 2601) {
        res.status(400).json(new responses.ErrorResponse("Duplicate name"));
      } else {
        res.status(500).send(err);
      }
    });
};

const put = (req, res) => {
  venuesService
    .put(req.model)
    .then(response => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
      if (err.number == 2601) {
        res.status(400).json(new responses.ErrorResponse("Duplicate name"));
      } else {
        res.status(500).send(err);
      }
    });
};

const del = (req, res) => {
  venuesService
    .del(req.params.id)
    .then(res => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  getAll,
  getById,
  search,
  post,
  put,
  del
};
