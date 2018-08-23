const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = () => {
  return mssql.executeProc("Config_SelectAll", sqlRequest => {}).then(res => {
    return res;
  });
};

const getById = id => {
  return mssql
    .executeProc("Config_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(res => {
      return res.resultSets[0][0];
    });
};

const getByKey = key => {
  return mssql
    .executeProc("Config_SelectByKey", sqlRequest => {
      sqlRequest.addParameter("Key", TYPES.NVarChar, key);
    })
    .then(res => {
      return res.resultSets[0][0];
    });
};

const post = item => {
  return mssql
    .executeProc("Config_Insert", sqlRequest => {
      sqlRequest.addParameter("Key", TYPES.NVarChar, item.key, { length: 50 });
      sqlRequest.addParameter("Value", TYPES.NVarChar, item.value);
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      console.log(response);
      return response.addOutputParameter;
    });
};

const put = item => {
  return mssql
    .executeProc("Config_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, item.id);
      sqlRequest.addParameter("Key", TYPES.NVarChar, item.key, { length: 50 });
      sqlRequest.addParameter("Value", TYPES.NVarChar, item.value);
    })
    .then(response => {
      console.log(response);
      return true;
    });
};

const del = id => {
  return mssql.executeProc("Config_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
  });
};

module.exports = {
  getAll,
  getById,
  getByKey,
  post,
  put,
  del
};
