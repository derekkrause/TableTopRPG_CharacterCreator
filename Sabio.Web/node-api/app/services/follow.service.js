const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const { signalNotificationForUser } = require("./dotnet-interop.service");

const getMessageContacts = id => {
  return mssql
    .executeProc("Follow_GetMessageContacts", sqlRequest => {
      sqlRequest.addParameter("FollowerId", TYPES.Int, id);
    })
    .then(res => {
      const item = {
        contacts: res.resultSets[0]
      };
      return item;
    })
    .catch(() => {
      const item = {};
      return item;
    });
};

const getByFollowerId = followerId => {
  return mssql
    .executeProc("Follow_SelectFollowingById", sqlRequest => {
      sqlRequest.addParameter("FollowerId", TYPES.Int, followerId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const getByUserId = userId => {
  return mssql
    .executeProc("Follow_SelectFollowedByById", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const post = item => {
  return mssql
    .executeProc("Follow_Insert", sqlRequest => {
      sqlRequest.addParameter("FollowerId", TYPES.Int, item.followerId);
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
      sqlRequest.addParameter("UserNotified", TYPES.Bit, item.userNotified);
    })
    .then(() => {
      signalNotificationForUser(item.userId);
      return true;
    });
};

const put = (followerId, userId) => {
  return mssql
    .executeProc("Follow_Update", sqlRequest => {
      sqlRequest.addParameter("FollowerId", TYPES.Int, followerId);
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const del = (followerId, userId) => {
  return mssql
    .executeProc("Follow_Delete", sqlRequest => {
      sqlRequest.addParameter("FollowerId", TYPES.Int, followerId);
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getByFollowerId,
  getByUserId,
  post,
  put,
  del,
  getMessageContacts
};
