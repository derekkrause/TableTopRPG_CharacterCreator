const router = require("express").Router();
const notificationsController = require("../controllers/notifications.controller");

module.exports = router;

router.get("/messages/:userId", notificationsController.get);
router.put("/messages/:userId", notificationsController.putMessage);
router.put("/:userId", notificationsController.put);
