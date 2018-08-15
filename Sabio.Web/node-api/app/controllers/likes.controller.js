const likesService = require("../services/likes.service");

const getByUserId = (req, res) => {
  likesService
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

const getByPostId = (req, res) => {
  likesService
    .getByPostId(req.params.postId)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getByEventId = (req, res) => {
  likesService
    .getByEventId(req.params.eventId)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getByMediaId = (req, res) => {
  likesService
    .getByPostId(req.params.mediaId)
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
  likesService
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
  likesService
    .del(req.params.id)
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
  getByPostId,
  getByEventId,
  getByMediaId,
  post,
  del
};
