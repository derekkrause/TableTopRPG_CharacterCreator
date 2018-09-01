const stripe = require("stripe")("sk_test_KEabP42AFNChOCEy4kkMtmnG");

const createNewCustomer = body => {
  return stripe.customers
    .create({ description: body.name, source: body.source, email: body.email })
    .then(customer => {
      console.log(customer, "customer");
      return customer;
    })
    .catch(err => {
      return err;
    });
};

const createNewSubscription = (id, plans) => {
  return stripe.subscriptions
    .create({
      customer: id,
      items: [{ plan: plans }]
    })
    .then(subscriber => {
      console.log(subscriber);
      return subscriber;
    });
};
const getCustomer = id => {
  return stripe.customers.retrieve(id).then(response => {
    return response;
  });
};

const cancelSubscription = id => {
  return stripe.subscriptions.del(id).then(response => {
    return response;
  });
};

module.exports = {
  createNewCustomer,
  createNewSubscription,
  getCustomer,
  cancelSubscription
};
