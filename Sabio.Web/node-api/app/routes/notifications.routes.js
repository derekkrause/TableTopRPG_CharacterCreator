const router = require("express").Router();
const notificationsController = require("../controllers/notifications.controller");

module.exports = router;

router.put("/:userId", notificationsController.put);
