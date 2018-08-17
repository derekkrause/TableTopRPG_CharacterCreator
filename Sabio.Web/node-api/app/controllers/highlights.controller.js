const highlightsService = require("../services/highlights.service");

const getByUserId = (req, res) => {
  highlightsService
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

const post = (req, res) => {
  highlightsService
    .post(req.body)
    .then(response => {
      console.log(response);
      res.status(201).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const del = (req, res) => {
  highlightsService
    .del(req.body)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  getByUserId,
  post,
  del
};
