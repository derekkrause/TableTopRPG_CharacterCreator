const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = (pageIndex, pageSize) => {
  return mssql
    .executeProc("Venue_SelectAll", sqlRequest => {
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

const getById = id => {
  return mssql
    .executeProc("Venue_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response.resultSets[0];
    });
};

const search = (searchString, pageIndex, pageSize, radius, lat, lon) => {
  return mssql
    .executeProc("Venue_Search", sqlRequest => {
      sqlRequest.addParameter("searchString", TYPES.NVarChar, searchString, {
        length: 50
      });
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
      sqlRequest.addParameter("radius", TYPES.Float, radius);
      sqlRequest.addParameter("lat", TYPES.Float, lat);
      sqlRequest.addParameter("Lon", TYPES.Float, lon);
    })
    .then(response => {
      console.log("RESULTS: " + JSON.stringify(response));
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        pagedItems: response.resultSets && response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
    });
};

// const searchByUser = searchString => {
//   return mssql
//     .executeProc("Venue_User_Search", sqlRequest => {
//       sqlRequest.addParameter("searchString", TYPES.NVarChar, searchString, {
//         length: 50
//       });
//       sqlRequest.addParameter("lat", TYPES.Float);
//       sqlRequest.addParameter("lon", TYPES.Float);
//       sqlRequest.addParameter("radius", TYPES.Float);
//     })
//     .then(response => {
//       return response.resultSets[0];
//     });
// };

const post = item => {
  return mssql
    .executeProc("Venue_Insert", sqlRequest => {
      sqlRequest.addParameter("Name", TYPES.NVarChar, item.name, {
        length: 100
      });
      sqlRequest.addParameter("Street", TYPES.NVarChar, item.street);
      sqlRequest.addParameter("Suite", TYPES.NVarChar, item.suite);
      sqlRequest.addParameter("City", TYPES.NVarChar, item.city);
      sqlRequest.addParameter("State", TYPES.NVarChar, item.state);
      sqlRequest.addParameter("Zip", TYPES.NVarChar, item.zip);
      sqlRequest.addParameter("Lat", TYPES.NVarChar, item.lat);
      sqlRequest.addParameter("Lon", TYPES.NVarChar, item.lon);
      sqlRequest.addParameter("WebsiteUrl", TYPES.NVarChar, item.websiteUrl, {
        length: 100
      });
      sqlRequest.addParameter("Logo", TYPES.NVarChar, item.logo, {
        length: 100
      });
      sqlRequest.addParameter("Inactive", TYPES.Bit, item.inactive);
      sqlRequest.addParameter("Description", TYPES.NVarChar, item.description, {
        length: 250
      });
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      console.log(response);
      return response.outputParameters;
    });
};

const put = item => {
  return mssql
    .executeProc("Venue_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, item.id);
      sqlRequest.addParameter("Name", TYPES.NVarChar, item.name, {
        length: 100
      });
      sqlRequest.addParameter("Street", TYPES.NVarChar, item.street);
      sqlRequest.addParameter("Suite", TYPES.NVarChar, item.suite);
      sqlRequest.addParameter("City", TYPES.NVarChar, item.city);
      sqlRequest.addParameter("State", TYPES.NVarChar, item.state);
      sqlRequest.addParameter("Zip", TYPES.NVarChar, item.zip);
      sqlRequest.addParameter("Lat", TYPES.NVarChar, item.lat);
      sqlRequest.addParameter("Lon", TYPES.NVarChar, item.lon);
      sqlRequest.addParameter("WebsiteUrl", TYPES.NVarChar, item.websiteUrl, {
        length: 250
      });
      sqlRequest.addParameter("Logo", TYPES.NVarChar, item.logo, {
        length: 250
      });
      sqlRequest.addParameter("Inactive", TYPES.Bit, item.inactive);
      sqlRequest.addParameter("Description", TYPES.NVarChar, item.description, {
        length: 250
      });
    })
    .then(response => {
      return true;
    });
};

const del = id => {
  return mssql.executeProc("Venue_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
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
