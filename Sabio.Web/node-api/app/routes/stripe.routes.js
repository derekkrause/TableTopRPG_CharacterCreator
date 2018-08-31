const router = require("express").Router();
const stripeController = require("../controllers/stripe.controller");

module.exports = router;

router.post("/newCustomer", stripeController.createNewCustomer);
router.post("/newSub/:id/:plan", stripeController.createNewSubscription);
router.get("/:id", stripeController.getCustomer);
router.get("/status", stripeController.getStripeStatus);
router.post("/cancelSub/:id", stripeController.cancelSubscription);
