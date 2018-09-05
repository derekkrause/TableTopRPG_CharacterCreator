const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
const ChangeEmail = require("../models/ChangeEmail");
const changeEmailController = require("../controllers/changeEmail.controller");

module.exports = router;

router.get("/:id(\\d+)", changeEmailController.getByEmail);

router.put("/:id", validateBody(ChangeEmail), changeEmailController.put);
