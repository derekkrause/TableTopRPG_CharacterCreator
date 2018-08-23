const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
const Config = require("../models/Config");
const ConfigController = require("../controllers/config.controller");

module.exports = router;

router.get("/", ConfigController.getAll);
router.get("/:id(\\d+)", ConfigController.getById);
router.get("/:key", ConfigController.getByKey);

router.post("/", validateBody(Config), ConfigController.post);
router.put("/:id", validateBody(Config), ConfigController.put);
router.delete("/:id", ConfigController.del);
