const router = require("express").Router();
const highlightsController = require("../controllers/highlights.controller");

module.exports = router;

router.get("/:userId", highlightsController.getByUserId);
router.post("/", highlightsController.post);
router.delete("/", highlightsController.del);
