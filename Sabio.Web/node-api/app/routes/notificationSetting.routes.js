const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const responses = require("../models/responses/index");
const notificationController = require("../controllers/notificationSetting.controller");

module.exports = router;

router.get("/:id", notificationController.getById);
router.put("/:id", notificationController.put);
