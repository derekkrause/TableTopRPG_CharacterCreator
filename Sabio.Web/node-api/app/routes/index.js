const router = require("express").Router();
const pogsRoutes = require("./pogs.routes");

module.exports = router;

router.use("/api/pogs", pogsRoutes);
