const router = require("express").Router();
const followService = require("../services/follow.service");
const responses = require("../models/responses/index");

const getMessageContacts = (req, res) => {
  followService
    .getMessageContacts(req.params.id)
    .then(item => {
      const r = new responses.ItemsResponse(item);
      res.json(r);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const getByFollowerId = (req, res) => {
  followService
    .getByFollowerId(req.params.followerId)
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
  followService
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

const getById = (req, res) => {
  followService
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

const post = (req, res) => {
  followService
    .post(req.body)
    .then(response => {
      res.status(201).send("You followed someone!");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const del = (req, res) => {
  followService
    .del(req.params.followerId, req.params.userId)
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
  getByFollowerId,
  getByUserId,
  getById,
  post,
  del,
  getMessageContacts
};
