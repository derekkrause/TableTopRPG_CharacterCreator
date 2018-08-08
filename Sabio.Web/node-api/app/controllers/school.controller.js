const schoolsService = require("../services/schools.service");

const getAll = (req, res) => {
  const PageIndex = req.params.PageIndex || req.query.PageIndex || 0;
  const ResultsPerPage = req.params.ResultsPerPage || req.query.ResultsPerPage;
  schoolsService
    .getAll(PageIndex, ResultsPerPage)
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
      console.log(req.body);
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

const search = (req, res) => {
  const SearchTerm = req.query.q;
  const PageIndex = req.params.PageIndex || 0;
  const ResultsPerPage = req.params.ResultsPerPage;
  schoolsService
    .search(PageIndex, ResultsPerPage, SearchTerm)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports = {
  getAll,
  post,
  put,
  getById,
  del,
  search
};
