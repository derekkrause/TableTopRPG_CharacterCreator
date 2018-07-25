const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = () => {
  return mssql
    .executeProc("School_SelectAll")
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
      request.addParameter("AddressId", TYPES.Int, body.AddressId);
      request.addParameter("AcademicUrl", TYPES.NVarChar, body.AcademicUrl);
      request.addParameter("AthleticUrl", TYPES.NVarChar, body.AthleticUrl);
      request.addParameter("Logo", TYPES.NVarChar, body.Logo);
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
      request.addParameter("AddressId", TYPES.Int, body.AddressId);
      request.addParameter("AcademicUrl", TYPES.NVarChar, body.AcademicUrl);
      request.addParameter("AthleticUrl", TYPES.NVarChar, body.AthleticUrl);
      request.addParameter("Logo", TYPES.NVarChar, body.Logo);
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

module.exports = {
  getAll,
  post,
  put,
  getById,
  del
};
