const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = body => {
  return mssql
    .executeProc("CoachTag_Insert", request => {
      request.addParameter("UserId", TYPES.Int, body.UserId);
      request.addParameter("TagName", TYPES.NVarChar, body.TagName);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    })
    .catch(err => {
      console.log(err);
    });
};

const del = id => {
  return mssql
    .executeProc("CoachTag_Delete", request => {
      request.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const getAll = () => {
  return mssql
    .executeProc("CoachTag_SelectAll")
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const getById = id => {
  return mssql
    .executeProc("CoachTag_SelectById", request => {
      request.addParameter("UserId", TYPES.Int, id);
    })
    .then(response => {
      console.log(response, "response");
      const item = {
        tags: response.resultSets[0]
      };
      for (let i = 0; i < response.resultSets[0].length; i++) {
        let id = response.resultSets[0][i].id.toString();
        item.tags[i].id = id;
      }
      return item;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  post,
  del,
  getAll,
  getById
};
