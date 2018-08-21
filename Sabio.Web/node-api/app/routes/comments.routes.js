const router = require("express").Router();
const commentsController = require("../controllers/comments.controller");

module.exports = router;

router.get("/:id", commentsController.getById);
router.get("/", commentsController.getAll);
router.get("/posts/:postId", commentsController.getByPostId);
router.get("/events/:eventId", commentsController.getByEventId);
router.get("/media/:mediaId", commentsController.getByMediaId);

router.post("/", commentsController.post);
router.put("/:id", commentsController.put);
router.delete("/:id", commentsController.del);
