const ConnectionPool = require("tedious-connection-pool");
const { TYPES, Request } = require("tedious");

module.exports.TYPES = TYPES;
module.exports.executeSql = executeSql;
module.exports.executeJson = executeJson;

// TODO: factor out poolConfig
const poolConfig = {
  min: 2,
  max: 5,
  log: false
};

// TODO: factor out config
const connectionConfig = {
  userName: "C54_User",
  password: "Sabiopass1!54",
  server: "13.64.246.7",
  options: {
    database: "C54_RecruitHub",
    encrypt: true
  }
};

const pool = new ConnectionPool(poolConfig, connectionConfig);

module.exports.pool = pool;

function executeJson(query, paramsCallback) {
  return new Promise((resolve, reject) => {
    pool.acquire((err, con) => {
      if (err) {
        reject(err);
        return;
      }

      const parts = [];

      const req = new Request(query, (err, rowCount) => {
        con.release();
        if (err) {
          reject(err);
        } else {
          resolve(parts.join(""));
        }
      });

      if (paramsCallback) {
        paramsCallback(req);
      }

      req.on("row", columns => {
        parts.push(columns[0].value);
      });

      con.execSql(req);
    });
  });
}

function executeSql(query, paramsCallback) {
  return new Promise((resolve, reject) => {
    pool.acquire((err, con) => {
      if (err) {
        reject(err);
        return;
      }

      const rows = [];

      const req = new Request(query, (err, rowCount) => {
        con.release();
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });

      if (paramsCallback) {
        paramsCallback(req);
      }

      req.on("row", columns => {
        const row = {};
        for (const column of columns) {
          row[column.metadata.colName] = column.value;
        }
        rows.push(row);
      });

      con.execSql(req);
    });
  });
}
