const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = (pageIndex, pageSize) => {
  return mssql
    .executeProc("Pog_SelectAll", sqlRequest => {
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
    })
    .then(response => {
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const item = {
        pagedItems: response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
      return item;
    });
};

const search = (pageIndex, pageSize, searchString) => {
  return mssql
    .executeProc("Pog_Search", sqlRequest => {
      sqlRequest.addParameter("searchString", TYPES.NVarChar, searchString, {
        length: 50
      });
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
    })
    .then(response => {
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        pagedItems: response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
    });
};

const getById = id => {
  return mssql
    .executeProc("Pog_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, req.params.id);
    })
    .then(response => {
      return response.resultSets[0];
    });
};

const post = item => {
  return mssql
    .executeProc("Pog_Insert", sqlRequest => {
      sqlRequest.addParameter("Name", TYPES.NVarChar, item.name, {
        length: 50
      });
      sqlRequest.addParameter("StartDate", TYPES.Date, item.startDate);
      sqlRequest.addParameter("Country", TYPES.NVarChar, item.country, {
        length: 50
      });
      sqlRequest.addParameter("Points", TYPES.Int, item.points);
      sqlRequest.addParameter("Inactive", TYPES.Bit, item.inactive);
      sqlRequest.addParameter("Url", TYPES.NVarChar, item.url, { length: 255 });
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    });
};

const put = item => {
  return mssql
    .executeProc("Pog_Update", sqlRequest => {
      sqlRequest.addParameter("Name", TYPES.NVarChar, name, { length: 50 });
      sqlRequest.addParameter("StartDate", TYPES.Date, startDate);
      sqlRequest.addParameter("Country", TYPES.NVarChar, country, {
        length: 50
      });
      sqlRequest.addParameter("Points", TYPES.Int, points);
      sqlRequest.addParameter("Inactive", TYPES.Bit, inactive);
      sqlRequest.addParameter("Url", TYPES.NVarChar, url, { length: 255 });
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return true;
    });
};

const del = id => {
  return mssql.executeProc("Pog_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, req.params.id);
  });
};

module.exports = {
  getAll,
  getById,
  search,
  post,
  put,
  del
};
