const router = require("express").Router();
const schoolsController = require("../controllers/school.controller");

module.exports = router;

router.get("/:id", schoolsController.getById);
router.get("/", schoolsController.getAll);
router.post("/", schoolsController.post);
router.put("/:id", schoolsController.put);
router.delete("/:id", schoolsController.del);
