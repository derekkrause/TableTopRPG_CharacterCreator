const router = require("express").Router();

const venuesRoutes = require("./venues.routes");
const sportsPositionsController = require("../controllers/sportPositions.controller");
const FaqsController = require("../controllers/faqs.controller");
const FaqsCategoriesController = require("../controllers/faqsCategories.controller");
const sportPositionsRoutes = require("./sportPosition.routes");
const pogsRoutes = require("./pogs.routes");
const faqsRoutes = require("./faqs.routes");
const athleteSchoolRoutes = require("./athleteSchool.routes");
const faqsCategoriesRoutes = require("./faqsCategories.routes");
const athleteSchoolTagsRoutes = require("./athleteSchoolTags.routes");
const athleteTagsRoutes = require("./athleteTags.routes");
const coachesRoutes = require("./coaches.routes");
const conferencesRoutes = require("./conferences.routes");
const schoolsRoutes = require("./schools.routes");
const profilesRoutes = require("./profiles.routes");
const mediaRoutes = require("./media.routes");
const followRoutes = require("./follow.routes");
const highlightsRoutes = require("./highlights.routes");
const likesRoutes = require("./likes.routes");
const athleteSchoolLogRoutes = require("./athleteSchoolLog.routes");
const athleteRoutes = require("./athlete.routes");
const testRoutes = require("./test.routes");
const validateUser = require("../filters/validate.user");
const userFromJWT = require("../filters/jwt.user");

module.exports = router;

router.use("/sportPosition", sportPositionsRoutes);

router.use("/api/pogs", pogsRoutes);
router.use("/schools", schoolsRoutes);

router.use("/api/coaches", coachesRoutes);

router.use("/profile", profilesRoutes);
router.use("/media", mediaRoutes);
router.use("/follow", followRoutes);
router.use("/highlights", highlightsRoutes);
router.use("/likes", likesRoutes);

router.use("/api/conferences", conferencesRoutes);
router.use("/school", schoolsRoutes);

router.route("/faqs").get(FaqsController.getAll);

router.route("/faqs/:id").get(FaqsController.getFaqByCategory);
router.use("/faqs", faqsRoutes);

router.use("/faqsCategories", faqsCategoriesRoutes);

router.use("/athleteSchool", athleteSchoolRoutes);
router.use("/athlete", athleteRoutes);
router.use("/athleteSchoolLog", athleteSchoolLogRoutes);

router.use("/athleteSchoolTags", athleteSchoolTagsRoutes);

router.use("/athleteTags", athleteTagsRoutes);
router.use("/coaches", coachesRoutes);

router.use("/api/conferences", conferencesRoutes);
router.use("/school", schoolsRoutes);

router.use("/venues", venuesRoutes);

// -----------------------------------
// Authenticated routes go below this:
// -----------------------------------

router.use(userFromJWT);
router.use(validateUser);

router.use("/api/test", testRoutes); // TODO: remove this before delivery to the client
