const router = require("express").Router();
const pogsService = require("../services/pogs.service");

const responses = require("../models/responses/index");

// Controllers implement the "endpoint" methods - i.e., the end of the middleware
// pipeline where the service's work is performed (usually by a single method
// to a service) and the appropriate HttpResponse is generated.

// preferred way to specify pageIndex, pageSize would be as
// query string parameters - we allow them as route parameter
// just for compatibility with
// sabiobootcampapi.azurewebsites.net convention
const getAll = (req, res) => {
  // Allow pageIndex and pageSize to come in as either route parameter
  // or qeuryString parameter, or default value if neither.
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 24;
  pogsService
    .getAll(pageIndex, pageSize)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const search = (req, res) => {
  const searchString = req.query.searchString || "";
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 24;
  pogsService
    .search(pageIndex, pageSize, searchString)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const getById = (req, res) => {
  pogsService
    .getById(req.params.id)
    .then(item => {
      res.json(new ItemResponse(item));
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const post = (req, res) => {
  pogsService
    .post(req.model)
    .then(outputParms => {
      res.status(201).json(outputParms);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const put = (req, res) => {
  pogsService
    .put(req.model)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const del = (req, res) => {
  pogsService
    .del(req.params.id)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
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
