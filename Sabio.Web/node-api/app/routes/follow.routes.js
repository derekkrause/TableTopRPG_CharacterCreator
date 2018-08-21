const router = require("express").Router();
//const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
//const Follow = require("../models/Follow");
const followController = require("../controllers/follow.controller");

module.exports = router;

router.get("/following/:followerId", followController.getByFollowerId);
router.get("/followers/:userId", followController.getByUserId);
//router.get("/:id", followController.getById);

router.post("/", followController.post);
router.delete("/delete/:followerId/:userId", followController.del);
