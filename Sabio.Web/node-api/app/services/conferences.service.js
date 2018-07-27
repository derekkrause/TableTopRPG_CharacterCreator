const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = (pageIndex, pageSize) => {
  return mssql
    .executeProc("Conference_SelectAll", sqlRequest => {
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

// const search = (pageIndex, pageSize, searchString) => {
//   return mssql
//     .executeProc("Conference_Search", sqlRequest => {
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

const getById = id => {
  return mssql
    .executeProc("Conference_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    });
};

const post = item => {
  return mssql
    .executeProc("Conference_Insert", sqlRequest => {
      sqlRequest.addParameter("Code", TYPES.NVarChar, item.code, {
        length: 20
      });
      sqlRequest.addParameter("Name", TYPES.NVarChar, item.name, {
        length: 100
      });
      sqlRequest.addParameter("DisplayOrder", TYPES.Int, item.displayOrder);
      sqlRequest.addParameter("Inactive", TYPES.Bit, item.inactive);
      sqlRequest.addParameter("Link", TYPES.NVarChar, item.link, {
        length: 250
      });
      sqlRequest.addParameter("Logo", TYPES.NVarChar, item.logo, {
        length: 250
      });
      sqlRequest.addParameter("SchoolTypeId", TYPES.Int, item.schoolTypeId);

      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    });
};

const put = item => {
  return mssql
    .executeProc("Conference_Update", sqlRequest => {
      sqlRequest.addParameter("Code", TYPES.NVarChar, item.code, {
        length: 20
      });
      sqlRequest.addParameter("Name", TYPES.NVarChar, item.name, {
        length: 100
      });
      sqlRequest.addParameter("DisplayOrder", TYPES.Int, item.displayOrder);
      sqlRequest.addParameter("Inactive", TYPES.Bit, item.inactive);
      sqlRequest.addParameter("Link", TYPES.NVarChar, item.link, {
        length: 250
      });
      sqlRequest.addParameter("Logo", TYPES.NVarChar, item.logo, {
        length: 250
      });
      sqlRequest.addParameter("SchoolTypeId", TYPES.Int, item.schoolTypeId);

      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return true;
    });
};

const del = id => {
  return mssql.executeProc("Conference_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
  });
};

module.exports = {
  getAll,
  getById,
  //search,
  post,
  put,
  del
};
