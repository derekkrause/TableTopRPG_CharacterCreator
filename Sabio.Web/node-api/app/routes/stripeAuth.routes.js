const express = require("express");
const userStripeId = require("../services/user.service");
const stripeService = require("../services/stripe.service");

const router = express.Router();

router.get("/status", (req, res) => {
  const user = req.user;
  userStripeId.getCustomerId(user.id).then(results => {
    console.log(results.resultSets[0][0], "result sets");
    const cusId = results.resultSets[0][0].StripeUserId;

    stripeService.getCustomer(cusId).then(result => {
      console.log(result.subscriptions.data[0].current_period_end, "res");
      const currentPeriodEnd = result.subscriptions.data[0].current_period_end;
      const date = new Date();
      const time = date.getTime();
      const endTime = time + currentPeriodEnd;
      const endDate = new Date(endTime)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      console.log(endDate);
      console.log(endTime, "exptime");
      console.log(endTime - time);
      if (endTime - time < 0) {
        res.status(200).send(false);
      } else {
        const payload = {
          subExpiration: endDate
        };
        userStripeId
          .insertSubExpiration(payload, user.id)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        res.status(200).send(true);
      }
    });
  });
});

module.exports = router;
