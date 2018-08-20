const router = require("express").Router();
const coachAthleteController = require("../controllers/coachAthlete.controller");

module.exports = router;

router.post("/", coachAthleteController.post);
router.delete("/:id(\\d+)", coachAthleteController.del);
router.put("/:id(\\d+)", coachAthleteController.put);
router.get("/:id(\\d+)", coachAthleteController.getById);
router.get("/", coachAthleteController.getAll);
