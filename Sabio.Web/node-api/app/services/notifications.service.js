const TYPES = require("tedious").TYPES;
const mssql = require("../../mssql");

const get = userId => {
  return mssql
    .executeProc("User_NotifiedMessages", sqlRequest => {
      sqlRequest.addParameter("CurrentUserId", TYPES.Int, userId);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};

const putMessage = userId => {
  return mssql
    .executeProc("DismissMessageNotificationsByUserId", sqlRequest => {
      sqlRequest.addParameter("CurrentUserId", TYPES.Int, userId);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};

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
  get,
  putMessage,
  put
};
