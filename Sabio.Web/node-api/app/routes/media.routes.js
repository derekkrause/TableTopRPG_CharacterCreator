const router = require("express").Router();
const validateBody = require("../filters/validate.body");
//const Media = require("../models/Media");
const mediaController = require("../controllers/media.controller");

module.exports = router;

router.get("/:id", mediaController.getById);
router.get("/user/:userId", mediaController.getByUserId);
router.get("/", mediaController.getAll);
//router.get("/:pageIndex/:pageSize", mediaController.getAll);

router.post("/", mediaController.post);
router.put("/:id", mediaController.put);
router.delete("/:id", mediaController.del);
