const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
//const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
const Coach = require("../models/Coach");
const coachesController = require("../controllers/coaches.controller");

module.exports = router;

router.get("/:id", coachesController.getById);

router.get("/", coachesController.getAll);

//router.get("/:pageIndex/:pageSize", coachesController.getAll);
//router.get("/search/:pageIndex/:pageSize/", coachesController.search);

router.post("/", validateBody(Coach), coachesController.post);
router.put("/:id", validateBody(Coach), coachesController.put);
router.delete("/:id", coachesController.del);
