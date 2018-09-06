const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const { signalNotificationForUser } = require("./dotnet-interop.service");

const getByUserId = userId => {
  return mssql
    .executeProc("Like_SelectAllByUserId", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const getByPostId = postId => {
  return mssql
    .executeProc("Like_SelectAllByPostId", sqlRequest => {
      sqlRequest.addParameter("PostId", TYPES.Int, postId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const getByEventId = eventId => {
  return mssql
    .executeProc("Like_SelectAllByEventId", sqlRequest => {
      sqlRequest.addParameter("EventId", TYPES.Int, eventId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const getByMediaId = mediaId => {
  return mssql
    .executeProc("Like_SelectAllByMediaId", sqlRequest => {
      sqlRequest.addParameter("MediaId", TYPES.Int, mediaId);
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
    .executeProc("Like_Insert", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
      sqlRequest.addParameter("PostId", TYPES.Int, item.postId);
      sqlRequest.addParameter("EventId", TYPES.Int, item.eventId);
      sqlRequest.addParameter("MediaId", TYPES.Int, item.mediaId);
      sqlRequest.addParameter("UserNotified", TYPES.Bit, item.userNotified);
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(res => {
      signalNotificationForUser(item.userId);
      return res;
    })
    .catch(err => {
      return err;
    });
};

const put = id => {
  return mssql
    .executeProc("Like_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const del = id => {
  return mssql
    .executeProc("Like_Delete", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getByUserId,
  getByPostId,
  getByEventId,
  getByMediaId,
  post,
  put,
  del
};
