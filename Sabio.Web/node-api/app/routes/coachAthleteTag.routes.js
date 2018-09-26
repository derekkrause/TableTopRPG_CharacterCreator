const router = require("express").Router();
const coachAthleteTagController = require("../controllers/coachAthleteTag.controller");

module.exports = router;

router.get("/", coachAthleteTagController.getAll);
router.get("/:id", coachAthleteTagController.getById);
router.delete("/:id(\\d+)", coachAthleteTagController.del);
router.post("/", coachAthleteTagController.post);
