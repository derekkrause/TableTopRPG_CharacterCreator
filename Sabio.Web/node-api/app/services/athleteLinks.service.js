const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = (userId, linkTitle, link, IconId) => {
  return mssql
    .executeProc("AthleteLink_Insert", request => {
      request.addParameter("UserId", TYPES.Int, userId);
      request.addParameter("LinkTitle", TYPES.NVarChar, linkTitle);
      request.addParameter("Link", TYPES.NVarChar, link);
      request.addParameter("IconId", TYPES.Int, iconId);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      const Id = response.outputParameters.Id;
      return Id;
    });
};

const getAll = () => {
  return mssql
    .executeProc("AthleteLink_SelectAll")
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const getById = id => {
  return mssql
    .executeProc("AthleteLink_SelectById", request => {
      request.addParameter("UserId", TYPES.Int, id);
    })
    .then(response => {
      const item = {
        athleteLinks: response.resultSets[0]
      };
      return item;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  post,
  getAll,
  getById
};
