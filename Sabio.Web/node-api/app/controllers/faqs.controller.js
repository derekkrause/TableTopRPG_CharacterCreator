const responses = require("../models/responses/index");
const faqsService = require("../services/faqs.service");

module.exports = {
  getAll: async (req, res) => {
    faqsService.getAll().then(item => {
      const r = new responses.ItemsResponse(item);
      res.json(r);
    });
  },

  getFaqBySearch: async (req, res) => {
    faqsService
      .searchFaq(req)
      .then(item => {
        const r = new responses.ItemsResponse(item);
        res.json(r);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  getFaqByCategory: async (req, res) => {
    faqsService
      .searchFaqByCategory(req)
      .then(item => {
        const r = new responses.ItemsResponse(item);
        res.json(r);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  postFaq: async (req, res) => {
    const { categoryId, question, answer, displayOrder } = req.body;

    faqsService.postFaq(categoryId, question, answer, displayOrder).then(Id => {
      res.status(201).json(Id);
    });
  },

  updateFaq: async (req, res) => {
    const { categoryId, question, answer, displayOrder } = req.body;

    faqsService.updateFaq(categoryId, question, answer, displayOrder, req).then(() => {
      res.sendStatus(200);
    });
  },

  deleteFaq: async (req, res) => {
    faqsService.deleteFaq(req).then(() => {
      res.sendStatus(200);
    });
  }
};
