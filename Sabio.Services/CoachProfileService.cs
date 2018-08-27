using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;

namespace Sabio.Services
{

    public class CoachProfileService
    {
        readonly IDataProvider dataProvider;

        public CoachProfileService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public CoachProfile GetByUserId(int id)
        {
            CoachProfile coach = null;

            dataProvider.ExecuteCmd(
                "Coach_SelectByUserId",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", id);
                },
                (reader, resultSetIndex) =>
                {
                    coach = new CoachProfile
                    {
                        Id = (int)reader["Id"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"]
                    };

                    object MiddleNameValue = reader["MiddleName"];
                    if (MiddleNameValue != DBNull.Value)
                    {
                        coach.MiddleName = (string)MiddleNameValue;
                    };

                    object AvatarUrlValue = reader["AvatarUrl"];
                    if (AvatarUrlValue != DBNull.Value)
                    {
                        coach.AvatarUrl = (string)AvatarUrlValue;
                    };

                    object CityValue = reader["City"];
                    if (CityValue != DBNull.Value)
                    {
                        coach.City = (string)CityValue;
                    };

                    object StateValue = reader["State"];
                    if (StateValue != DBNull.Value)
                    {
                        coach.State = (string)StateValue;
                    };

                    object TitleValue = reader["Title"];
                    if (TitleValue != DBNull.Value)
                    {
                        coach.Title = (string)TitleValue;
                    };

                    object BioValue = reader["ShortBio"];
                    if (BioValue != DBNull.Value)
                    {
                        coach.Bio = (string)BioValue;
                    };

                    object SchoolValue = reader["SchoolName"];
                    if (SchoolValue != DBNull.Value)
                    {
                        coach.SchoolName = (string)SchoolValue;
                    };

                });

            return coach;
        }
    }
}
