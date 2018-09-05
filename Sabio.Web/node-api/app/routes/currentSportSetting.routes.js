const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const responses = require("../models/responses/index");
const currentSportSettingController = require("../controllers/currentSportSetting.controller");

module.exports = router;

router.put("/:id", currentSportSettingController.put);
