const schoolsService = require("../services/schools.service");

const getAll = (req, res) => {
  schoolsService
    .getAll()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const post = (req, res) => {
  schoolsService
    .post(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const put = (req, res) => {
  schoolsService
    .put(req.body)
    .then(response => {
      res.status(200).send("User Updated");
    })
    .catch(err => {
      console.log(err);
    });
};

const getById = (req, res) => {
  schoolsService
    .getById(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(404).send(err);
      console.log(err);
    });
};

const del = (req, res) => {
  schoolsService
    .del(req.params.id)
    .then(response => {
      res.status(200).send("School Deleted");
    })
    .catch(err => console.log(err));
};

module.exports = {
  getAll,
  post,
  put,
  getById,
  del
};
