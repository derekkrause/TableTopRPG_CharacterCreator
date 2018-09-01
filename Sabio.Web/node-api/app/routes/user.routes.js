const router = require("express").Router();
const userController = require("../controllers/user.controller");

module.exports = router;

router.put("/:id", userController.insertStripeId);
router.put("/expiration/:id", userController.insertSubExpiration);
router.put("/stripe/insert/expiration", userController.addSubscriptionDateToAll);
