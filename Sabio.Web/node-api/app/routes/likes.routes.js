const router = require("express").Router();
const likesController = require("../controllers/likes.controller");

module.exports = router;

router.get("/users/:userId", likesController.getByUserId);
router.get("/posts/:postId", likesController.getByPostId);
router.get("/events/:eventId", likesController.getByEventId);
router.get("/media/:mediaId", likesController.getByMediaId);

router.post("/", likesController.post);
router.put("/:id", likesController.put);
router.delete("/:id", likesController.del);
