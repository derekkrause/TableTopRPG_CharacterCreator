const athleteProfile = require("../services/athlete.service");

const responses = require("../models/responses/index");

const getById = (req, res) => {
  athleteProfile.getById(req.params.id).then(item => {
    const r = new responses.ItemResponse(item);
    res.json(r);
  });
};

// const putById = (req, res) => {
//   const {
//     id,
//     userId,
//     firstName,
//     middleName,
//     lastName,
//     schoolId,
//     classYearId,
//     highSchoolGraduationYear,
//     city,
//     state,
//     height,
//     weight
//   } = req.body;
//   athleteProfile
//     .putById(
//       id,
//       userId,
//       firstName,
//       middleName,
//       lastName,
//       schoolId,
//       classYearId,
//       highSchoolGraduationYear,
//       city,
//       state,
//       height,
//       weight
//     )
//     .then(response => {
//       res.sendStatus(200);
//     });
// };

const putById = (req, res) => {
  athleteProfile.putById(req.body, req.params.id).then(response => {
    res.status(201).send("Hey this worked");
  });
};

module.exports = {
  getById,
  putById
};
