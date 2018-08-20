const router = require("express").Router();
const athleteSearchController = require("../controllers/athleteSearch.controller");

module.exports = router;

router.get("/search", athleteSearchController.search);
