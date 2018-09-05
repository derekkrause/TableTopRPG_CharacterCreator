const notificationsService = require("../services/notifications.service");

const get = (req, res) => {
  notificationsService
    .get(req.params.userId)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const putMessage = (req, res) => {
  notificationsService
    .put(req.params.userId)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const put = (req, res) => {
  notificationsService
    .put(req.params.userId)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  get,
  putMessage,
  put
};
