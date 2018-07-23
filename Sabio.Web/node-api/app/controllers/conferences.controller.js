const router = require("express").Router();
const conferencesService = require("../services/conferences.service");

const responses = require("../models/responses/index");

const getAll = (req, res) => {
  conferencesService.getAll().then(response => {
    console.log(response);
    res.json(response);
  });
};

// const getAll = (req, res) => {
//   const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
//   const pageSize = req.params.pageSize || req.query.pageSize || 4;
//   coachesService
//     .getAll(pageIndex, pageSize)
//     .then(item => {
//       const r = new responses.ItemResponse(item);
//       res.json(r);
//     })
//     .catch(err => {
//       res.set(500).send(err);
//     });
// };

// const search = (req, res) => {
//   const searchString = req.query.searchString || "";
//   const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
//   const pageSize = req.params.pageSize || req.query.pageSize || 4;
//   conferencesService
//     .search(pageIndex, pageSize, searchString)
//     .then(item => {
//       const r = new responses.ItemResponse(item);
//       res.json(r);
//     })
//     .catch(err => {
//       res.set(500).send(err);
//     });
// };

const getById = (req, res) => {
  conferencesService
    .getById(req.params.id)
    .then(item => {
      res.status(200).send(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const post = (req, res) => {
  conferencesService
    .post(req.model)
    .then(outputParams => {
      res.status(201).json(outputParams);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const put = (req, res) => {
  conferencesService
    .put(req.model)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const del = (req, res) => {
  conferencesService
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
  //search,
  post,
  put,
  del
};
