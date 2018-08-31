const notificationsService = require("../services/notifications.service");

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
  put
};
