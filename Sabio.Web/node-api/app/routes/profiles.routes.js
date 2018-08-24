const router = require("express").Router();
const profilesController = require("../controllers/profiles.controller");

module.exports = router;

router.get("/", profilesController.getById);

router.get("/events/:userId", profilesController.getEvents);

router.put("/:id", profilesController.put);