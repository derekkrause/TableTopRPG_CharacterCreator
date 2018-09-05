const router = require("express").Router();
const validateBody = require("../filters/validate.body");
const userController = require("../controllers/user.controller");
const UserPassword = require("../models/UserPassword");

module.exports = router;

router.put("/:id", validateBody(UserPassword), userController.put);

router.put("/:id", userController.insertStripeId);
router.put("/expiration/:id", userController.insertSubExpiration);
router.put("/stripe/insert/expiration", userController.addSubscriptionDateToAll);
