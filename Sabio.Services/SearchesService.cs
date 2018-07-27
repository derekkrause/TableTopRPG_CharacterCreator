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
                "Athlete_Search",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchString", q);
                },
                (reader, resultSetIndex) =>
                {
                    AthleteInfo athleteInfo = new AthleteInfo
                    {
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        DOB = (DateTime)reader["DOB"]
                    };
                    object classYearId = reader["ClassYearId"];
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
                    }
                    object avatarUrl = reader["AvatarUrl"];
                    if (avatarUrl != DBNull.Value)
                    {
                        athleteInfo.AvatarUrl = (string)avatarUrl;
                    }
                    newAthleteInfo = athleteInfo;
                });
            return newAthleteInfo;
        }
    }
}
