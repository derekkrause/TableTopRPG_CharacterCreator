const router = require("express").Router();
const sportsPositionsController = require("../controllers/sportPositions.controller");
const FaqsController = require("../controllers/faqs.controller");
const FaqsCategoriesController = require("../controllers/faqsCategories.controller");
const pogsRoutes = require("./pogs.routes");
const coachesRoutes = require("./coaches.routes");
const conferencesRoutes = require("./conferences.routes");
const schoolsRoutes = require("./schools.routes");
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

router.use("/api/coaches", coachesRoutes);

router.use("/api/conferences", conferencesRoutes);
router.use("/school", schoolsRoutes);

router.route("/faqs").get(FaqsController.getAll);

router.route("/faqs/:id").get(FaqsController.getFaqByCategory);

router.route("/faqs").post(FaqsController.postFaq);

router.route("/faqs/:id").put(FaqsController.updateFaq);

router.route("/faqs/:id").delete(FaqsController.deleteFaq);

router.route("/faqs/search/:pageIndex/:pageSize").get(FaqsController.getFaqBySearch);

router.route("/faqsCategories").get(FaqsCategoriesController.getAll);

router.route("/faqsCategories").post(FaqsCategoriesController.postFaqCategory);

router.route("/faqsCategories/:id").put(FaqsCategoriesController.updateFaqCategory);

router.route("/faqsCategories/:id").delete(FaqsCategoriesController.deleteFaqCategory);

// -----------------------------------
// Authenticated routes go below this:
// -----------------------------------

router.use(userFromJWT);
router.use(validateUser);

router.use("/api/test", testRoutes); // TODO: remove this before delivery to the client
