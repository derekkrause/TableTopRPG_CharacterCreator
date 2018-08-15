const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = id => {
  return mssql
    .executeProc("Media_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

const getByUserId = userId => {
  return mssql
    .executeProc("Media_SelectByUserId", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

const getAll = () => {
  return mssql
    .executeProc("Media_SelectAll", sqlRequest => {})
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

// const getAll = (pageIndex, pageSize) => {
//   return mssql
//     .executeProc("Media_SelectAll", sqlRequest => {
//       sqlRequest.addParameter("pageIndex", TYPES.int, pageIndex);
//       sqlRequest.addParameter("PageSize", TYPES.int, pageSize);
//     })
//     .then(res => {
//       const totalCount =
//         (response.resultSets &&
//           response.resultSets[0] &&
//           response.resultSets[0][0] &&
//           response.resultSets[0][0].TotalRows) ||
//         0;
//       const totalPages = Math.ceil(totalCount / pageSize);
//       const item = {
//         pagedItems: response.resultSets[0],
//         pageIndex: pageIndex,
//         pageSize: pageSize,
//         totalCount: totalCount,
//         totalPages: totalPages
//       };
//       return res;
//     });
// };

const post = item => {
  return mssql
    .executeProc("Media_Insert", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
      sqlRequest.addParameter("Type", TYPES.NVarChar, item.type, { length: 50 });
      sqlRequest.addParameter("Url", TYPES.NVarChar, item.url, { length: 250 });
      sqlRequest.addParameter("DisplayOrder", TYPES.Int, item.displayOrder);
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

const put = body => {
  return mssql
    .executeProc("Media_Update", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, body.userId);
      sqlRequest.addParameter("Type", TYPES.NVarChar, body.type, { length: 50 });
      sqlRequest.addParameter("Url", TYPES.NVarChar, body.url, { length: 250 });
      sqlRequest.addParameter("DisplayOrder", TYPES.Int, body.displayOrder);
      sqlRequest.addParameter("Id", TYPES.Int, body.id);
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      console.log(err);
    });
};

const del = id => {
  return mssql
    .executeProc("Media_Delete", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getById,
  getByUserId,
  getAll,
  post,
  put,
  del
};
