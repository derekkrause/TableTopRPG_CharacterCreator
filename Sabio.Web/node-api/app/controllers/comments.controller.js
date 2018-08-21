const commentsService = require("../services/comments.service");

const getAll = (req, res) => {
  commentsService
    .getAll()
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
  commentsService
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

const getByPostId = (req, res) => {
  commentsService
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
  commentsService
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
  commentsService
    .getByMediaId(req.params.mediaId)
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
  commentsService
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

const put = (req, res) => {
  commentsService
    .put(req.body)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const del = (req, res) => {
  commentsService
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
  getAll,
  getById,
  getByPostId,
  getByEventId,
  getByMediaId,
  post,
  put,
  del
};
