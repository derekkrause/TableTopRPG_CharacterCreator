const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
const Pog = require("../models/Pog");

const pogsController = require("../controllers/pogs.controller");

module.exports = router;

router.get("/:id", pogsController.getById);
router.get("/", pogsController.getAll);
router.get("/:pageIndex/:pageSize", pogsController.getAll);
router.get("/search/:pageIndex/:pageSize/", pogsController.search);

router.post("/", validateBody(Pog), pogsController.post);
router.put("/:id", validateBody(Pog), pogsController.put);
router.delete("/", pogsController.del);
