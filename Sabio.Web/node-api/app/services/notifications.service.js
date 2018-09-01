const TYPES = require("tedious").TYPES;
const mssql = require("../../mssql");

const put = userId => {
  return mssql
    .executeProc("DismissAllNotifications_ByUserId", sqlRequest => {
      sqlRequest.addParameter("CurrentUserId", TYPES.Int, userId);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  put
};
