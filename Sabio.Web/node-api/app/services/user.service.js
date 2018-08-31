const TYPES = require("tedious").TYPES;
const mssql = require("../../mssql");

const insertStripeId = (body, Id) => {
  return mssql
    .executeProc("User_InsertStripeId", request => {
      request.addParameter("StripeUserId", TYPES.NVarChar, body.cusId);
      request.addParameter("StripeSubId", TYPES.NVarChar, body.subId);
      request.addParameter("Id", TYPES.Int, Id);
    })
    .then(response => {
      return response;
    });
};
const insertSubExpiration = (body, Id) => {
  return mssql
    .executeProc("User_InsertSubExpiration", request => {
      request.addParameter("Id", TYPES.Int, Id);
      request.addParameter("SubscriptionExpiration", TYPES.NVarChar, body.subExpiration);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const getCustomerId = body => {
  return mssql
    .executeProc("User_SelectStripeId", request => {
      request.addParameter("Id", TYPES.Int, body);
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const addSubscriptionDateToAll = body => {
  return mssql
    .executeProc("User_InsertSubExpirationAllUser", request => {
      request.addParameter("SubscriptionExpiration", TYPES.NVarChar, body.subExpiration);
    })
    .then(response => {
      return response;
    });
};

module.exports = {
  insertStripeId,
  insertSubExpiration,
  getCustomerId,
  addSubscriptionDateToAll
};
