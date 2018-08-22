const router = require("express").Router();
const highlightsController = require("../controllers/highlights.controller");

module.exports = router;

router.get("/highlighting/:userId", highlightsController.getByUserId);
router.post("/", highlightsController.post);
router.delete("/delete/:highlighterId/:userId", highlightsController.del);
router.get("/trending", highlightsController.getTrendingAthletes);
