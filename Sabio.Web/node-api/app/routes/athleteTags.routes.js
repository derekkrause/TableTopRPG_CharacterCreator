const AthleteTagsController = require("../controllers/athleteTags.controller");
const router = require("express").Router();

module.exports = router;

router.get("/:id", AthleteTagsController.getById);

router.post("/", AthleteTagsController.postTag);

router.delete("/:id", AthleteTagsController.deleteTag);
