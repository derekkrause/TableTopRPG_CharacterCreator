const router = require("express").Router();
const currentSportSettingService = require("../services/currentSportSetting.service");
const responses = require("../models/responses/index");

const put = (req, res) => {
  if (req.body.id != req.user.id) {
    res.status(400).end();
    return;
  }
  currentSportSettingService
    .put(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  put
};
