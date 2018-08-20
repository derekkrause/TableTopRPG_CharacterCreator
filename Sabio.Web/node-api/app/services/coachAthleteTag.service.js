const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = body => {
  return mssql
    .executeProc("CoachAthleteTag_Insert", request => {
      request.addParameter("UserId", TYPES.Int, body.UserId);
      request.addParameter("Tag", TYPES.NVarChar, body.Tag);
      request.addParameter("AthleteId", TYPES.Int, body.AthleteId);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const del = (id, tag) => {
  return mssql
    .executeProc("CoachAthleteTag_Delete", request => {
      request.addParameter("AthleteId", TYPES.Int, id);
      request.addParameter("Tag", TYPES.NVarChar, tag);
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
    .executeProc("CoachAthleteTag_SelectAll")
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const getById = id => {
  return mssql
    .executeProc("CoachAthleteTag_SelectByCoachId", request => {
      request.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  post,
  getAll,
  getById,
  del
};
