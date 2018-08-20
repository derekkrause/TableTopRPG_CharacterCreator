const TYPES = require("tedious").TYPES;
const mssql = require("../../mssql");

const search = query => {
  return mssql
    .executeProc("Athlete_AutoCompleteSearch", request => {
      request.addParameter("SearchTerm", TYPES.NVarChar, query);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  search
};
