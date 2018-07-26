using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;

namespace Sabio.Services
{
    public class SearchesService
    {
        readonly IDataProvider dataProvider;

        public SearchesService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }
        public AthleteInfo Search(string q)
        {
            AthleteInfo newAthleteInfo = new AthleteInfo();
            dataProvider.ExecuteCmd(
                "Athlete_Join",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchString", q);
                },
                (reader, resultSetIndex) =>
                {
                    AthleteInfo athleteInfo = new AthleteInfo
                    {
                        FirstName = (string)reader["FirstName"],
                        MiddleName = (string)reader["MiddleName"],
                        LastName = (string)reader["LastName"],
                        AvatarUrl = (string)reader["AvatarUrl"],
                        DOB = (DateTime)reader["DOB"],
                        ClassYearId = (int)reader["ClassYearId"],
                        HighSchoolGraduationYear = (int)reader["HighSchoolGraduationYear"]

                    };
                    /*object classYearId = reader["ClassYearId"];
                    if (classYearId != DBNull.Value)
                    {
                        athleteInfo.ClassYearId = (int)classYearId;
                    }
                    object highSchoolGraduationYear = reader["HighSchoolGraduationYear"];
                    if (highSchoolGraduationYear != DBNull.Value)
                    {
                        athleteInfo.HighSchoolGraduationYear = (int)highSchoolGraduationYear;
                    }
                    object middleName = reader["MiddleName"];
                    if (middleName != DBNull.Value)
                    {
                        athleteInfo.MiddleName = (string)middleName;
                    }*/
                    newAthleteInfo = athleteInfo;
                });
            return newAthleteInfo;
        }
    }
}
