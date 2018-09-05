const bcrypt = require("bcrypt");
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

// ---------- CHANGE PASSWORD ----------
const saltRounds = 10;

const changePassword = (userId, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    // 1. get the user's current password hash from the database
    mssql
      .executeProc("User_GetPasswordHash", sqlRequest => {
        sqlRequest.addParameter("UserId", TYPES.Int, userId);
      })
      .then(response => {
        const existingPasswordHash = response.resultSets[0][0];

        // 2. check the existing password hash with the supplied old password
        console.log(typeof existingPasswordHash.PasswordHash);
        bcrypt.compare(oldPassword, existingPasswordHash.PasswordHash, (err, res) => {
          if (err) {
            reject(err);
            return;
          }

          if (!res) {
            reject("Incorrect existing password.");
            return;
          }

          // 3. if we get here, the existing password was correct. Update the database.
          bcrypt.hash(newPassword, saltRounds, function(err, hash) {
            if (err) {
              reject(err);
              return;
            }

            mssql
              .executeProc("User_SetPassword", sqlRequest => {
                sqlRequest.addParameter("passwordHash", TYPES.NVarChar, hash, {
                  length: 200
                });
                sqlRequest.addParameter("userId", TYPES.Int, userId);
              })
              .then(resolve, reject);
          });
        });
      })
      .catch(reject);
  });
};

// ---------- STRIPE ----------
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
  changePassword,
  insertStripeId,
  insertSubExpiration,
  getCustomerId,
  addSubscriptionDateToAll
};
