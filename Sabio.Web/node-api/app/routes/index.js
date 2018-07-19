const router = require("express").Router();
const pogsRoutes = require("./pogs.routes");
const coachesRoutes = require("./coaches.routes");

module.exports = router;

router.use("/api/pogs", pogsRoutes);

router.use("/api/coaches", coachesRoutes);
