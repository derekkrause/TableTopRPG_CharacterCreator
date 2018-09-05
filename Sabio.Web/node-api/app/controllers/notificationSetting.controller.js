const router = require("express").Router();
const notificationSettingService = require("../services/notificationSetting.service");
const responses = require("../models/responses/index");

const getById = (req, res) => {
  notificationSettingService
    .getById(req.params.id)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.status(500).sent(err);
    });
};

const put = (req, res) => {
  // if (req.body.id != req.user.id) {
  //   res.status(400).end();
  //   return;
  // }
  notificationSettingService
    .put(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  getById,
  put
};
