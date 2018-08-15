const router = require("express").Router();
const sportsPositionsController = require("../controllers/sportPositions.controller");
const FaqsController = require("../controllers/faqs.controller");
const FaqsCategoriesController = require("../controllers/faqsCategories.controller");
const pogsRoutes = require("./pogs.routes");
const faqsRoutes = require("./faqs.routes");
const athleteSchoolRoutes = require("./athleteSchool.routes");
const faqsCategoriesRoutes = require("./faqsCategories.routes");
const athleteSchoolTagsRoutes = require("./athleteSchoolTags.routes");
const athleteTagsRoutes = require("./athleteTags.routes");
const coachesRoutes = require("./coaches.routes");
const conferencesRoutes = require("./conferences.routes");
const schoolsRoutes = require("./schools.routes");
const athleteSchoolLogRoutes = require("./athleteSchoolLog.routes");
const testRoutes = require("./test.routes");
const validateUser = require("../filters/validate.user");
const userFromJWT = require("../filters/jwt.user");

module.exports = router;

router.post("/sportposition", sportsPositionsController.postSportPosition);
router.get("/sportposition", sportsPositionsController.getAllSportPosition);
// router.get("/sportposition/:id", sportsPositionsController.getSportPositionById);
router.get("/sportposition/:sportName", sportsPositionsController.getSportPositionBySportName);
router.put("/sportposition", sportsPositionsController.putSportPosition);
router.delete("/sportposition/:id", sportsPositionsController.deleteSportPosition);
router.use("/api/pogs", pogsRoutes);
router.use("/schools", schoolsRoutes);

router.use("/faqs", faqsRoutes);

router.use("/faqsCategories", faqsCategoriesRoutes);

router.use("/athleteSchool", athleteSchoolRoutes);

router.use("/athleteSchoolLog", athleteSchoolLogRoutes);

router.use("/athleteSchoolTags", athleteSchoolTagsRoutes);

router.use("/athleteTags", athleteTagsRoutes);
router.use("/coaches", coachesRoutes);

router.use("/api/conferences", conferencesRoutes);
router.use("/school", schoolsRoutes);

// -----------------------------------
// Authenticated routes go below this:
// -----------------------------------

router.use(userFromJWT);
router.use(validateUser);

router.use("/api/test", testRoutes); // TODO: remove this before delivery to the client
