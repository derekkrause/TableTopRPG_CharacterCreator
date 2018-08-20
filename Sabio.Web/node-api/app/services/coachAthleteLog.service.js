const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = body => {
  return mssql
    .executeProc("CoachAthleteLog_Insert", request => {
      request.addParameter("UserId", TYPES.Int, body.UserId);
      request.addParameter("DateContacted", TYPES.Date, body.DateContacted);
      request.addParameter("Notes", TYPES.NVarChar, body.Notes);
      request.addParameter("AthleteId", TYPES.Int, body.AthleteId);
      request.addParameter("InitiatorId", TYPES.Int, body.InitiatorId);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    })
    .catch(err => {
      console.log(err);
    });
};

const put = (body, Id) => {
  return mssql
    .executeProc("CoachAthleteLog_Update", request => {
      request.addParameter("UserId", TYPES.Int, body.UserId);
      request.addParameter("DateContacted", TYPES.Date, body.DateContacted);
      request.addParameter("Notes", TYPES.NVarChar, body.Notes);
      request.addParameter("AthleteId", TYPES.Int, body.AthleteId);
      request.addParameter("InitiatorId", TYPES.Int, body.InitiatorId);
      request.addParameter("Id", TYPES.Int, body.Id);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};

const del = id => {
  return mssql
    .executeProc("CoachAthleteLog_Delete", request => {
      request.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response, "Success";
    })
    .catch(err => {
      console.log(err);
    });
};

const getById = (UserId, AthleteId) => {
  return mssql
    .executeProc("CoachAthleteLog_SelectById", request => {
      request.addParameter("UserId", TYPES.Int, UserId);
      request.addParameter("AthleteId", TYPES.Int, AthleteId);
    })
    .then(response => {
      const item = {
        activities: response.resultSets[0]
      };
      return item;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  post,
  put,
  getById,
  del
};
