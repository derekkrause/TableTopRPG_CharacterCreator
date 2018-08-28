const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = (pageIndex, pageSize) => {
  return mssql
    .executeProc("Coach_SelectAll", sqlRequest => {
      //sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      //sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
    })
    .then(response => {
      //   const totalCount =
      //     (response.resultSets &&
      //       response.resultSets[0] &&
      //       response.resultSets[0][0] &&
      //       response.resultSets[0][0].TotalRows) ||
      //     0;
      //const totalPages = Math.ceil(totalCount / pageSize);
      //   const item = {
      //     pagedItems: response.resultSets[0],
      //     pageIndex: pageIndex,
      //     pageSize: pageSize,
      //     totalCount: totalCount,
      //     totalPages: totalPages
      //  };
      return response;
    });
};

const getTrend = () => {
  return mssql.executeProc("Coach_Trend", sqlRequest => {}).then(response => {
    return response;
  });
};
// const search = (pageIndex, pageSize, searchString) => {
//   return mssql
//     .executeProc("Coach_Search", sqlRequest => {
//       sqlRequest.addParameter("searchString", TYPES.NVarChar, searchString, {
//         length: 50
//       });
//       sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
//       sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
//     })
//     .then(response => {
//       const totalCount =
//         (response.resultSets &&
//           response.resultSets[0] &&
//           response.resultSets[0][0] &&
//           response.resultSets[0][0].TotalRows) ||
//         0;
//       const totalPages = Math.ceil(totalCount / pageSize);
//       return {
//         pagedItems: response.resultSets[0],
//         pageIndex: pageIndex,
//         pageSize: pageSize,
//         totalCount: totalCount,
//         totalPages: totalPages
//       };
//     });
// };

const search = (searchString, state, title, name) => {
  return mssql
    .executeProc("Coach_Search", sqlRequest => {
      sqlRequest.addParameter("SearchString", TYPES.NVarChar, searchString, {
        length: 250
      });
      sqlRequest.addParameter("State", TYPES.NVarChar, state, { length: 2 });
      sqlRequest.addParameter("Title", TYPES.NVarChar, title, { length: 250 });
      sqlRequest.addParameter("Name", TYPES.NVarChar, schoolName, {
        length: 250
      });
    })
    .then(response => {
      return response;
    });
};

const getById = id => {
  return mssql
    .executeProc("Coach_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    });
};

// const post = item => {
//   return mssql
//     .executeProc("Coach_Insert", sqlRequest => {
//       sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
//       sqlRequest.addOutputParameter("Id", TYPES.Int, null);
//     })
//     .then(response => {
//       return response.outputParameters;
//     });
// };

const put = item => {
  return mssql
    .executeProc("Coach_Update", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
      sqlRequest.addParameter("Title", TYPES.NVarChar, item.title, {
        length: 250
      });
      sqlRequest.addParameter("SchoolId", TYPES.Int, item.schoolId);
      sqlRequest.addParameter("ShortBio", TYPES.NVarChar, item.shortBio, {
        length: 500
      });

      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return true;
    });
};

const del = id => {
  return mssql.executeProc("Coach_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
  });
};

module.exports = {
  getAll,
  getById,
  search,
  // post,
  put,
  del,
  getTrend
};
