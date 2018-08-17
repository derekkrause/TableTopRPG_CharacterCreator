const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = id => {
  return mssql
    .executeProc("Athlete_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      const item = {
        athletes: response.resultSets[0]
      };
      return item;
    });
};

// const putById = (
//   id,
//   userId,
//   firstName,
//   middleName,
//   lastName,
//   schoolId,
//   classYearId,
//   highSchoolGraduationYear,
//   city,
//   state,
//   height,
//   weight
// ) => {
//   return mssql
//     .executeProc("Athlete_Update", sqlRequest => {
//       sqlRequest.addParameter("Id", TYPES.int, id);
//       sqlRequest.addParameter("UserId", TYPES.int, userId);
//       sqlRequest.addParameter("FirstName", TYPES.NVarChar, firstName);
//       sqlRequest.addParameter("MiddleName", TYPES.NVarChar, middleName);
//       sqlRequest.addParameter("LastName", TYPES.NVarChar, lastName);
//       sqlRequest.addParameter("SchoolId", TYPES.int, schoolId);
//       sqlRequest.addParameter("ClassYearId", TYPES.int, classYearId);
//       sqlRequest.addParameter("HighSchoolGraduationYear", TYPES.int, highSchoolGraduationYear);
//       sqlRequest.addParameter("City", TYPES.NVarChar, city);
//       sqlRequest.addParameter("State", TYPES.NVarChar, state);
//       sqlRequest.addParameter("Height", TYPES.int, height);
//       sqlRequest.addParameter("Weight", TYPES.int, weight);
//     })
//     .then(response => {
//       return response;
//     });
// };

const putById = (body, Id) => {
  return mssql
    .executeProc("Athlete_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, body.id);
      sqlRequest.addParameter("UserId", TYPES.Int, Id);
      sqlRequest.addParameter("FirstName", TYPES.NVarChar, body.firstName);
      sqlRequest.addParameter("MiddleName", TYPES.NVarChar, body.middleName);
      sqlRequest.addParameter("LastName", TYPES.NVarChar, body.lastName);
      sqlRequest.addParameter("SchoolId", TYPES.Int, body.schoolId);
      sqlRequest.addParameter("ClassYearId", TYPES.Int, body.classYearId);
      sqlRequest.addParameter("HighSchoolGraduationYear", TYPES.Int, body.highSchoolGraduationYear);
      sqlRequest.addParameter("City", TYPES.NVarChar, body.city);
      sqlRequest.addParameter("State", TYPES.NVarChar, body.state);
      sqlRequest.addParameter("Height", TYPES.Int, body.height);
      sqlRequest.addParameter("Weight", TYPES.Int, body.weight);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getById,
  putById
};
