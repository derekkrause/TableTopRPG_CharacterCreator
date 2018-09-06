const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = body => {
  return mssql
    .executeProc("CoachAthlete_Insert", request => {
      request.addParameter("UserId", TYPES.Int, body.UserId);
      request.addParameter("AthleteId", TYPES.Int, body.AthleteId);
      request.addParameter("Notes", TYPES.NVarChar, body.Notes);
      request.addParameter("Inactive", TYPES.Bit, body.Inactive);
      request.addParameter("Rank", TYPES.Int, body.Rank);
      request.addParameter("Name", TYPES.NVarChar, body.Name);
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
    .executeProc("CoachAthlete_Update", request => {
      console.log(body);
      request.addParameter("Notes", TYPES.NVarChar, body.Notes);

      request.addParameter("Rank", TYPES.Int, body.Rank);

      request.addParameter("AthleteId", TYPES.Int, body.AthleteId);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};
const del = id => {
  return mssql
    .executeProc("CoachAthlete_Delete", request => {
      request.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response, "Success";
    })
    .catch(err => {
      console.log(err);
    });
};

const getAll = () => {
  return mssql
    .executeProc("CoachAthlete_SelectAll")
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

const getById = id => {
  return mssql
    .executeProc("CoachAthlete_SelectByCoachId", request => {
      request.addParameter("UserId", TYPES.Int, id);
    })
    .then(response => {
      console.log(response.resultSets);
      const item = { athlete: response.resultSets[0] };

      for (const athlete of item.athlete) {
        athlete.tags = [];
        if (response.resultSets[1] != undefined) {
          for (let i = 0; i < response.resultSets[1].length; i++) {
            var obj = {};
            obj.AthleteId = response.resultSets[1][i].AthleteId;
            obj.name = response.resultSets[1][i].Tag;

            if (obj.AthleteId === athlete.AthleteId) {
              athlete.tags.push(obj);
            }
          }
        }
      }

      return item;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  post,
  del,
  getAll,
  getById,
  put
};
