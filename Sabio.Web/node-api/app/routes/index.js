const router = require("express").Router();
const FaqsController = require("../controllers/faqs.controller");
const FaqsCategoriesController = require("../controllers/faqsCategories.controller");
const pogsRoutes = require("./pogs.routes");
<<<<<<< HEAD
const schoolsRoutes = require("./schools.routes");
=======
//const { validateBody, schemas } = require("../../helpers/routeHelpers");
>>>>>>> origin/master

module.exports = router;

router.use("/api/pogs", pogsRoutes);
<<<<<<< HEAD
router.use("/school", schoolsRoutes);
=======

router.route("/faqs").get(FaqsController.getAll);

router.route("/faqs/:id").get(FaqsController.getFaqByCategory);

router.route("/faqs").post(FaqsController.postFaq);

router.route("/faqs/:id").put(FaqsController.updateFaq);

router.route("/faqs/:id").delete(FaqsController.deleteFaq);

router
  .route("/faqs/search/:pageIndex/:pageSize")
  .get(FaqsController.getFaqBySearch);

router.route("/faqsCategories").get(FaqsCategoriesController.getAll);

router.route("/faqsCategories").post(FaqsCategoriesController.postFaqCategory);

router
  .route("/faqsCategories/:id")
  .put(FaqsCategoriesController.updateFaqCategory);

router
  .route("/faqsCategories/:id")
  .delete(FaqsCategoriesController.deleteFaqCategory);
>>>>>>> origin/master
