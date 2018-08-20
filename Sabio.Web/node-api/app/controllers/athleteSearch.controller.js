const athleteSearchService = require("../services/athleteSearch.service");

const search = (req, res) => {
  athleteSearchService.search(req.query.q).then(response => {
    res.status(200).send(response);
  });
};

module.exports = {
  search
};
