const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = id => {
  return mssql
    .executeProc("UserNotificationSetting_SelectByUserId", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, id);
    })
    .then(res => {
      return res.resultSets[0][0];
    });
};

const put = item => {
  return mssql
    .executeProc("UserNotificationSetting_Upsert", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, item.UserId);
      sqlRequest.addParameter("MessageReceived", TYPES.Bit, item.MessageReceived);
      sqlRequest.addParameter("PostLiked", TYPES.Bit, item.PostLiked);
      sqlRequest.addParameter("Follow", TYPES.Bit, item.Follow);
    })
    .then(response => {
      return response;
    });
};

module.exports = {
  getById,
  put
};
