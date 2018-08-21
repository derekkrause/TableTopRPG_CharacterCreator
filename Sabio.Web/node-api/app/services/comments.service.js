const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = () => {
  return mssql
    .executeProc("Comment_SelectAll", sqlRequest => {})
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const getById = id => {
  return mssql
    .executeProc("Comment_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const getByPostId = postId => {
  return mssql
    .executeProc("Comment_SelectByParentPostId", sqlRequest => {
      sqlRequest.addParameter("ParentPost", TYPES.Int, postId);
    })
    .then(res => {
      let resultArray = [];
      for (let i = 0; i < res.resultSets[0].length; i++) {
        if (res.resultSets[0][i].removed === true) {
          let resultObject = {
            id: 14,
            firstName: "Unknown",
            lastName: "User",
            avatarUrl: "https://d6ps3lgai2qok.cloudfront.net/img/profile/default-profile-img.png",
            userId: null,
            parentPost: res.resultSets[0][i].parentPost,
            parentComment: res.resultSets[0][i].parentComment,
            comment: "Content removed by author.",
            removed: true,
            dateCreated: res.resultSets[0][i].dateCreated,
            dateModified: res.resultSets[0][i].dateModified
          };
          resultArray.push(resultObject);
        } else {
          resultArray.push(res.resultSets[0][i]);
        }
      }
      return resultArray;

      //return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const getByEventId = eventId => {
  return mssql
    .executeProc("Comment_SelectByParentEventId", sqlRequest => {
      sqlRequest.addParameter("ParentEvent", TYPES.Int, eventId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const getByMediaId = mediaId => {
  return mssql
    .executeProc("Comment_SelectByParentMediaId", sqlRequest => {
      sqlRequest.addParameter("ParentMedia", TYPES.Int, mediaId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const post = item => {
  return mssql
    .executeProc("Comment_Insert", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
      sqlRequest.addParameter("ParentPost", TYPES.Int, item.parentPost);
      sqlRequest.addParameter("ParentEvent", TYPES.Int, item.parentEvent);
      sqlRequest.addParameter("ParentMedia", TYPES.Int, item.parentMedia);
      sqlRequest.addParameter("ParentComment", TYPES.Int, item.parentComment);
      sqlRequest.addParameter("Comment", TYPES.NVarChar, item.comment, { length: 500 });
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const put = item => {
  return mssql
    .executeProc("Comment_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, item.id);
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
      sqlRequest.addParameter("ParentPost", TYPES.Int, item.parentPost);
      sqlRequest.addParameter("ParentEvent", TYPES.Int, item.parentEvent);
      sqlRequest.addParameter("ParentMedia", TYPES.Int, item.parentMedia);
      sqlRequest.addParameter("ParentComment", TYPES.Int, item.parentComment);
      sqlRequest.addParameter("Comment", TYPES.NVarChar, item.comment, { length: 500 });
      sqlRequest.addParameter("Removed", TYPES.Bit, item.removed);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const del = id => {
  return mssql
    .executeProc("Comment_DeleteById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

module.exports = {
  getAll,
  getById,
  getByPostId,
  getByEventId,
  getByMediaId,
  post,
  put,
  del
};
