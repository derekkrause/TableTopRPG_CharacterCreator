using Newtonsoft.Json.Linq;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;

namespace Sabio.Services
{
    public class AthleteSearchService
    {
        readonly IDataProvider dataProvider;

        public AthleteSearchService(IDataProvider dataProvider)

        {
            this.dataProvider = dataProvider;
        }

        public  List<AthleteSearchInfo> Search(string q, string classYear, string state, string school, string sportPosition)
        {
            List<AthleteSearchInfo> listOfAthletes = new List<AthleteSearchInfo>();
            dataProvider.ExecuteCmd(
                "Athlete_hunt",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchString", q);
                    parameters.AddWithValue("@ClassYear", classYear);
                    parameters.AddWithValue("@School", school);
                    parameters.AddWithValue("@State", state);
                    parameters.AddWithValue("@SportPosition", sportPosition);
                },
                (reader, resultSetIndex) =>
                {
                    AthleteSearchInfo athleteSearchInfo = new AthleteSearchInfo
                    {
                        UserId = reader.GetSafeInt32Nullable("UserId"),
                        AthleteId = reader.GetSafeInt32Nullable("AthleteId"),
                        ShortBio = reader.GetSafeString("ShortBio"),
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        MiddleName = reader.GetSafeString("MiddleName"),
                        AvatarUrl = reader.GetSafeString("AvatarURL"),
                        ClassYear = reader.GetSafeString("ClassYear"),
                        HighSchoolGraduationYear = reader.GetSafeInt32Nullable("HighSchoolGraduationYear"),
                        City = reader.GetSafeString("City"),
                        State = reader.GetSafeString("State"),
                        sportInfo = new JRaw((string)reader["sportInfo"]),
                        School = reader.GetSafeString("SchoolName"),

                    };
                    listOfAthletes.Add(athleteSearchInfo);
                });
            return listOfAthletes;
        }

        public List<AthleteSearchInfo2> Search2(string q, string classYear, string state, string school, string sportPosition)
        {
            List<AthleteSearchInfo2> listOfAthletes = new List<AthleteSearchInfo2>();
            dataProvider.ExecuteCmd(
                "Athlete_hunt2",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchString", q);
                    parameters.AddWithValue("@ClassYear", classYear);
                    parameters.AddWithValue("@School", school);
                    parameters.AddWithValue("@State", state);
                    parameters.AddWithValue("@SportPosition", sportPosition);
                },
                (reader, resultSetIndex) =>
                {
                    AthleteSearchInfo2 athleteSearchInfo = new AthleteSearchInfo2
                    {
                        UserId = reader.GetSafeInt32Nullable("UserId"),
                        AthleteId = reader.GetSafeInt32Nullable("AthleteId"),
                        ShortBio = reader.GetSafeString("ShortBio"),
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        MiddleName = reader.GetSafeString("MiddleName"),
                        AvatarUrl = reader.GetSafeString("AvatarURL"),
                        ClassYear = reader.GetSafeString("ClassYear"),
                        HighSchoolGraduationYear = reader.GetSafeInt32Nullable("HighSchoolGraduationYear"),
                        City = reader.GetSafeString("City"),
                        State = reader.GetSafeString("State"),
                        sportInfo = new JRaw((string)reader["sportInfo"]),
                        School = reader.GetSafeString("School"),
                        
                    };
                    listOfAthletes.Add(athleteSearchInfo);
                });
            return listOfAthletes;
        }

        public AthleteFilterOptions GetAllOptions()
        {
            AthleteFilterOptions options = new AthleteFilterOptions();

            dataProvider.ExecuteCmd(
                "Athlete_Search_Options",
                (parameters) =>
                { },
                (reader, resultSetIndex) =>
                {
                    switch (resultSetIndex) {
                        case 0:
                            DropDownClassYear classYear = new DropDownClassYear
                            {
                                Id = reader.GetSafeInt32Nullable("ClassYearId"),
                                Name = (string)reader["ClassYear"]
                            };
                            options.ClassYear.Add(classYear);
                            break;
                        case 1:
                            DropDownSportPosition sportPosition = new DropDownSportPosition
                            {
                                Id = reader.GetSafeInt32Nullable("SportPositionId"),
                                Name = (string)reader["SportPosition"],
                                Code = (string)reader["Code"]
                            };
                            options.SportPosition.Add(sportPosition);
                            break;
                        case 2:
                            State state = new State
                            {
                                Id = reader.GetSafeInt32Nullable("StateId"),
                                Name = (string)reader["State"]
                            };
                            options.State.Add(state);
                            break;
                        case 3:
                            DropDownSport sport = new DropDownSport
                            {
                                Id = reader.GetSafeInt32Nullable("SportId"),
                                Name = (string)reader["Sport"]
                            };
                            options.Sport.Add(sport);
                            break;
                }
                });
            return options;
        }
    }
}