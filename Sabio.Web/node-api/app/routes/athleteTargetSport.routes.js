const athleteTargetSportController = require("../controllers/athleteTargetSport.controller");
const router = require("express").Router();

module.exports = router;

router.post("/:id(\\d+)", athleteTargetSportController.post);
router.get("/:id(\\d+)", athleteTargetSportController.getById);
router.put("/", athleteTargetSportController.putById);
