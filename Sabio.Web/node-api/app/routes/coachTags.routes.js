const router = require("express").Router();
const coachTagsController = require("../controllers/coachTags.controller");

module.exports = router;

router.delete("/:id(\\d+)", coachTagsController.del);
router.post("/", coachTagsController.post);
router.get("/", coachTagsController.getAll);
router.get("/:id(\\d+)", coachTagsController.getById);
