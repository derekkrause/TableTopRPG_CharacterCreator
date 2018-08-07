using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class AthleteSearchService
    {
        readonly IDataProvider dataProvider;

        public AthleteSearchService(IDataProvider dataProvider)

        {
            this.dataProvider = dataProvider;
        }

        public  List<AthleteSearchInfo> Search(string q)
        {
            List<AthleteSearchInfo> listOfAthletes = new List<AthleteSearchInfo>();
            dataProvider.ExecuteCmd(
                "Athlete_hunt",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchString", q);
                },
                (reader, resultSetIndex) =>
                {
                    AthleteSearchInfo athleteSearchInfo = new AthleteSearchInfo
                    { };
                       
                    object FirstName = reader["FirstName"];
                    if (FirstName != DBNull.Value)
                    {
                        athleteSearchInfo.FirstName = (string)FirstName;
                    }

                    object LastName = reader["LastName"];
                    if (LastName != DBNull.Value)
                    {
                        athleteSearchInfo.LastName = (string)LastName;
                    }

                    object MiddleName = reader["MiddleName"];
                    if (MiddleName != DBNull.Value)
                    {
                        athleteSearchInfo.MiddleName = (string)MiddleName;
                    }

                    object AvatarURL = reader["AvatarURL"];
                    if (AvatarURL != DBNull.Value)
                    {
                        athleteSearchInfo.AvatarUrl = (string)AvatarURL;
                    }

                    object ClassYear = reader["ClassYear"];
                    if (ClassYear != DBNull.Value)
                    {
                        athleteSearchInfo.ClassYear = (string)ClassYear;
                    }
                    object HighSchoolGraduationYear = reader["HighSchoolGraduationYear"];
                    if (HighSchoolGraduationYear != DBNull.Value)
                    {
                        athleteSearchInfo.HighSchoolGraduationYear = (int)HighSchoolGraduationYear;
                    }

                    object City = reader["City"];
                    if (City != DBNull.Value)
                    {
                        athleteSearchInfo.City = (string)City;
                    }

                    object State = reader["State"];
                    if (State != DBNull.Value)
                    {
                        athleteSearchInfo.State = (string)State;
                    }
                    object SportName = reader["Sport"];
                    if (SportName != DBNull.Value)
                    {
                        athleteSearchInfo.SportName = (string)SportName;
                    }
                    object SportPosition = reader["SportPosition"];
                    if (SportPosition != DBNull.Value)
                    {
                        athleteSearchInfo.SportPosition = (string)SportPosition;
                    }

                    listOfAthletes.Add(athleteSearchInfo);
                });
            return listOfAthletes;
        }
    }
}

