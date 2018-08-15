const router = require("express").Router();
const mediaService = require("../services/media.service");
const responses = require("../models/responses/index");

const getById = (req, res) => {
  mediaService
    .getById(req.params.id)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getByUserId = (req, res) => {
  mediaService
    .getByUserId(req.params.userId)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getAll = (req, res) => {
  mediaService
    .getAll()
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

// const getAll = (req, res) => {
//   const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
//   const pageSize = req.params.pageSize || req.query.pageSize || 50;
//   mediaService
//     .getAll(pageIndex, pageSize)
//     .then(response => {
//       console.log(response);
//       const r = new responses.ItemResponse(response);
//       res.json(r);
//     })
//     .catch(err => {
//       res.set(500).send(err);
//     });
// };

const post = (req, res) => {
  mediaService
    .post(req.body)
    .then(response => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const put = (req, res) => {
  mediaService
    .put(req.body)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const del = (req, res) => {
  mediaService
    .del(req.params.id)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  getById,
  getByUserId,
  getAll,
  post,
  put,
  del
};
