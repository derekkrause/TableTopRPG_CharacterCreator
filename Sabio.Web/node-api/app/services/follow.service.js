const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

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
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const del = item => {
  return mssql
    .executeProc("Follow_Delete", sqlRequest => {
      sqlRequest.addParameter("FollowerId", TYPES.Int, item.followerId);
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
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
  del
};
