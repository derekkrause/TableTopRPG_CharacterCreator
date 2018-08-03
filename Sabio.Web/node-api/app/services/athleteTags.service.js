const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = req => {
  return mssql
    .executeProc("AthleteTag_SelectById", request => {
      request.addParameter("AthleteUserId", TYPES.Int, req.params.id);
    })
    .then(response => {
      const item = {
        tags: response.resultSets[0]
      };
      for (i = 0; i < response.resultSets[0].length; i++) {
        let id = response.resultSets[0][i].id.toString();
        item.tags[i].id = id;
      }
      return item;
    });
};

const postTag = (tagName, athleteUserId) => {
  return mssql
    .executeProc("AthleteTag_Insert", request => {
      request.addParameter("TagName", TYPES.NVarChar, tagName);
      request.addParameter("AthleteUserId", TYPES.Int, athleteUserId);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      const Id = response.outputParameters.Id;
      return Id;
    });
};

const deleteTag = req => {
  return mssql
    .executeProc("AthleteTag_Delete", request => {
      request.addParameter("Id", TYPES.Int, req.params.id);
    })
    .then(response => {
      return response;
    });
};

module.exports = {
  getById,
  postTag,
  deleteTag
};
