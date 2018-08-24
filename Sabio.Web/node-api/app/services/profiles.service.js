const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = id => {
  return mssql
    .executeProc("Profile_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    });
};

const getEvents = userId => {
  return mssql
    .executeProc("EventUser_SelectEventsByUserId", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(response => {
      return response;
    });
};

const put = body => {
  return mssql
    .executeProc("User_UpdateAvatar", sqlRequest => {
      sqlRequest.addParameter("AvatarUrl", TYPES.NVarChar, body.avatarUrl, { length: 250 });
      sqlRequest.addParameter("Id", TYPES.Int, body.id);
    })
    .then(response => {
      return response;
    });
};

module.exports = {
  getById,
  getEvents,
  put
};