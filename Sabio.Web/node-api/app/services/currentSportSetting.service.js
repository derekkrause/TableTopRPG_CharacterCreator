const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const put = item => {
  return mssql
    .executeProc("User_UpdateCurrentSportId", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, item.id);
      sqlRequest.addParameter("CurrentSportId", TYPES.Int, item.currentSportId);
    })
    .then(response => {
      // console.log(response);
      return true;
    });
};

module.exports = {
  put
};
