const stripeService = require("../services/stripe.service");

const createNewCustomer = (req, res) => {
  stripeService.createNewCustomer(req.body).then(response => {
    res.status(201).send(response);
  });
};

const createNewSubscription = (req, res) => {
  stripeService.createNewSubscription(req.params.id, req.params.plan).then(response => {
    res.status(201).send(response);
  });
};

const getCustomer = (req, res) => {
  stripeService.getCustomer(req.params.id).then(response => {
    res.status(200).send(response);
  });
};

const cancelSubscription = (req, res) => {
  stripeService.cancelSubscription(req.params.id).then(response => {
    res.status(200).send(response);
  });
};
const getStripeStatus = (req, res) => {
  const user = req.user;
  console.log(user);
};

module.exports = {
  createNewCustomer,
  createNewSubscription,
  getCustomer,
  cancelSubscription,
  getStripeStatus
};
