const userService = require("../services/user.service");

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
  insertStripeId,
  insertSubExpiration,
  addSubscriptionDateToAll
};
