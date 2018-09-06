const coachAthleteTagService = require("../services/coachAthleteTag.service");

const post = (req, res) => {
  coachAthleteTagService
    .post(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const del = (req, res) => {
  console.log(req, "request");
  coachAthleteTagService
    .del(req.params.id, req.query.tag)
    .then(() => {
      res.status(200).send("Tag Deleted");
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const getAll = (req, res) => {
  coachAthleteTagService
    .getAll()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const getById = (req, res) => {
  coachAthleteTagService
    .getById(req.params.id)
    .then(response => {
      res.status(200).send(response);
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
