const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
//const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
const Conference = require("../models/Conference");
const conferencesController = require("../controllers/conferences.controller");

module.exports = router;

router.get("/:id", conferencesController.getById);

router.get("/", conferencesController.getAll);

//router.get("/:pageIndex/:pageSize", coachesController.getAll);
//router.get("/search/:pageIndex/:pageSize/", coachesController.search);

router.post("/", validateBody(Conference), conferencesController.post);
router.put("/:id", validateBody(Conference), conferencesController.put);
router.delete("/:id", conferencesController.del);
