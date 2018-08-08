const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = (PageIndex, ResultsPerPage) => {
  return mssql
    .executeProc("School_SelectAll", request => {
      request.addParameter("PageIndex", TYPES.Int, PageIndex);
      request.addParameter("ResultsPerPage", TYPES.Int, ResultsPerPage);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const post = body => {
  return mssql
    .executeProc("School_Insert", request => {
      request.addParameter("Name", TYPES.NVarChar, body.Name);
      request.addParameter("SchoolTypeId", TYPES.Int, body.SchoolTypeId);
      request.addParameter("Street", TYPES.NVarChar, body.Street);
      request.addParameter("Suite", TYPES.NVarChar, body.Suite);
      request.addParameter("City", TYPES.NVarChar, body.City);
      request.addParameter("State", TYPES.NVarChar, body.State);
      request.addParameter("Zip", TYPES.Int, body.Zip);
      request.addParameter("Lat", TYPES.Float, body.Lat);
      request.addParameter("Lon", TYPES.Float, body.Lon);
      request.addParameter("PhoneNumber", TYPES.NVarChar, body.PhoneNumber);
      request.addParameter("Logo", TYPES.NVarChar, body.Logo);
      request.addParameter("Url", TYPES.NVarChar, body.Url);
      request.addParameter("InStateTuition", TYPES.Int, body.InStateTuition);
      request.addParameter("OutOfStateTuition", TYPES.Int, body.OutOfStateTuition);
      request.addParameter("SportLevel", TYPES.Int, body.SportLevel);
      request.addParameter("StudentSize", TYPES.Int, body.StudentSize);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    })
    .catch(err => {
      console.log(err);
    });
};

const put = body => {
  return mssql
    .executeProc("School_Update", request => {
      request.addParameter("Id", TYPES.Int, body.Id);
      request.addParameter("Name", TYPES.NVarChar, body.Name);
      request.addParameter("SchoolTypeId", TYPES.Int, body.SchoolTypeId);
      request.addParameter("Street", TYPES.NVarChar, body.Street);
      request.addParameter("Suite", TYPES.NVarChar, body.Suite);
      request.addParameter("City", TYPES.NVarChar, body.City);
      request.addParameter("State", TYPES.NVarChar, body.State);
      request.addParameter("Zip", TYPES.Int, body.Zip);
      request.addParameter("Lat", TYPES.Float, body.Lat);
      request.addParameter("Lon", TYPES.Float, body.Lon);
      request.addParameter("PhoneNumber", TYPES.NVarChar, body.PhoneNumber);
      request.addParameter("Logo", TYPES.NVarChar, body.Logo);
      request.addParameter("Url", TYPES.NVarChar, body.Url);
      request.addParameter("InStateTuition", TYPES.Int, body.InStateTuition);
      request.addParameter("OutOfStateTuition", TYPES.Int, body.OutOfStateTuition);
      request.addParameter("StudentSize", TYPES.Int, body.StudentSize);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const getById = Id => {
  return mssql
    .executeProc("School_SelectById", request => {
      request.addParameter("Id", TYPES.Int, Id);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const del = Id => {
  return mssql
    .executeProc("School_Delete", request => {
      request.addParameter("Id", TYPES.Int, Id);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const search = (PageIndex, ResultsPerPage, SearchTerm) => {
  return mssql
    .executeProc("School_Search", request => {
      request.addParameter("SearchTerm", TYPES.NVarChar, SearchTerm);
      request.addParameter("PageIndex", TYPES.Int, PageIndex);
      request.addParameter("ResultsPerPage", TYPES.Int, ResultsPerPage);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getAll,
  post,
  put,
  getById,
  del,
  search
};
