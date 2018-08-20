const router = require("express").Router();
const coachAthleteLogController = require("../controllers/coachAthleteLog.controller");

module.exports = router;

router.post("/", coachAthleteLogController.post);
router.put("/:id(\\d+)", coachAthleteLogController.put);
router.delete("/:id(\\d+)", coachAthleteLogController.del);
router.get("/:id(\\d+)/:athleteId(\\d+)", coachAthleteLogController.getById);
