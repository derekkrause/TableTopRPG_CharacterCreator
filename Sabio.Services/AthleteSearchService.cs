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
                        Id = reader.GetSafeInt32Nullable("AthleteId"),
                        ShortBio = (string)reader["ShortBio"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        MiddleName = (string)reader["MiddleName"],
                        AvatarUrl = (string)reader["AvatarURL"],
                        ClassYear = (string)reader["ClassYear"],
                        HighSchoolGraduationYear = reader.GetSafeInt32Nullable("HighSchoolGraduationYear"),
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        SportName = (string)reader["Sport"],
                        SportPosition = (string)reader["SportPosition"],
                        School = (string)reader["School"],

                };
                    listOfAthletes.Add(athleteSearchInfo);
                });
            return listOfAthletes;
        }
        public AthleteFilterOptions GetAllOptions()
        {
            AthleteFilterOptions Options = new AthleteFilterOptions();

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
                            Options.ClassYear.Add(classYear);
                            break;
                        case 1:
                            DropDownSportPosition sportPosition = new DropDownSportPosition
                            {
                                Id = reader.GetSafeInt32Nullable("SportPositionId"),
                                Name = (string)reader["SportPosition"]
                            };
                            Options.SportPosition.Add(sportPosition);
                            break;
                        case 2:
                            State state = new State
                            {
                                Id = reader.GetSafeInt32Nullable("StateId"),
                                Name = (string)reader["State"]
                            };
                            Options.State.Add(state);
                            break; 
                }
                });
            return Options;
        }
    }
}