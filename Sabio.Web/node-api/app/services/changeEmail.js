const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = id => {
  return mssql
    .executeProc("User_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
      sqlRequest.addParameter("Email", TYPES.NVarChar, email);
    })
    .then(res => {
      return res.resultSets[0][0];
    });
};

const put = item => {
  return mssql
    .executeProc("User_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, item.id);
      sqlRequest.addParameter("Email", TYPES.NVarChar, item.email, { length: 100 });
    })
    .then(response => {
      console.log(response);
      return true;
    });
};

module.exports = {
  getById,
  put
};
