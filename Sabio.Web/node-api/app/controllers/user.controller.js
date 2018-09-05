const router = require("express").Router();
const userService = require("../services/user.service");
const responses = require("../models/responses/index");

const put = (req, res) => {
  userService
    .changePassword(req.params.id, req.model.oldPassword, req.model.newPassword)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const insertStripeId = (req, res) => {
  userService.insertStripeId(req.body, req.params.id).then(response => {
    res.status(200).send(response);
  });
};

const insertSubExpiration = (req, res) => {
  userService
    .insertSubExpiration(req.body, req.params.id)
    .then(() => {
      res.status(200).send("Expiration Added");
    })
    .catch(err => {
      console.log(err);
    });
};
const addSubscriptionDateToAll = (req, res) => {
  userService
    .addSubscriptionDateToAll(req.body)
    .then(() => {
      res.status(200).send("Stripe Activated");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  put,
  insertStripeId,
  insertSubExpiration,
  addSubscriptionDateToAll
};
