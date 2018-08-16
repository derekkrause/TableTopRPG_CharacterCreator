const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
const Venue = require("../models/Venue");
const venuesController = require("../controllers/venues.controller");

module.exports = router;

router.get("/:id(\\d+)", venuesController.getById);
router.get("/", venuesController.getAll);
router.get("/:pageIndex/:pageSize", venuesController.getAll);
router.get("/search", venuesController.search);
// router.get("/search", venuesController.searchByUser);

router.post("/", validateBody(Venue), venuesController.post);
router.put("/:id", validateBody(Venue), venuesController.put);
router.delete("/:id", venuesController.del);
