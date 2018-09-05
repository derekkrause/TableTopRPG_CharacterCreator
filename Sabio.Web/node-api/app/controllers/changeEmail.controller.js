const router = require("express").Router();
const changeEmailService = require("../services/changeEmail.service");
const responses = require("../models/responses/index");

const getByEmail = (req, res) => {
  changeEmailService
    .getByEmail(req.params.email)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.status(500).sent(err);
    });
};

module.exports = {
  getByEmail
};
