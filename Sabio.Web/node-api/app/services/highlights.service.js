const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getByUserId = userId => {
  return mssql
    .executeProc("Highlight_SelectHighlightsByUserId", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const post = item => {
  return mssql
    .executeProc("Highlight_Insert", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, item.userId);
      sqlRequest.addParameter("HighlightId", TYPES.Int, item.highlightId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const del = (highlighterId, userId) => {
  return mssql
    .executeProc("Highlight_Delete", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
      sqlRequest.addParameter("HighlightId", TYPES.Int, highlighterId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const getTrendingAthletes = () => {
  return mssql.executeProc("Select_TrendingAthletesByHighlights").then(res => {
    return res;
  });
};

module.exports = {
  getByUserId,
  post,
  del,
  getTrendingAthletes
};
