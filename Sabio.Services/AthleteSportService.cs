using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System.Collections.Generic;
using System.Data;
using Sabio.Data;
using System;

namespace Sabio.Services
{
    public class AthleteSportService
    {
        readonly IDataProvider dataProvider;

        public AthleteSportService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }
        public void Create(AthleteSportCreateRequest request)
        {
            dataProvider.ExecuteNonQuery(
                "AthleteSportTeam_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", request.UserId);
                    parameters.AddWithValue("@SchoolId", request.SchoolId);
                    parameters.AddWithValue("@ClubName", request.ClubName ?? (object)DBNull.Value);
                    parameters.AddWithValue("@TeamName", request.TeamName ?? (object)DBNull.Value);
                    parameters.AddWithValue("@SelectedSchoolClubOrTeam", request.SelectedSchoolClubOrTeam);
                    parameters.AddWithValue("@SportId", request.SportId);
                    parameters.AddWithValue("@ClassYearId", request.ClassYearId);
                    parameters.AddWithValue("@SportPositionIdsJson", request.SportPositionId.ToString());
                    parameters.AddWithValue("@Comments", request.Comments);
                    parameters.AddWithValue("@SportLevelId", request.SportLevelId);
                });
        }
        public void Update(AthleteSportUpdateRequest request, int id)
        {
            dataProvider.ExecuteNonQuery(
                "AthleteSportTeam_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", request.Id);
                    parameters.AddWithValue("@UserId", request.UserId);
                    parameters.AddWithValue("@SchoolId", request.SchoolId);
                    parameters.AddWithValue("@ClubName", request.ClubName ?? (object)DBNull.Value);
                    parameters.AddWithValue("@TeamName", request.TeamName ?? (object)DBNull.Value);
                    parameters.AddWithValue("@SelectedSchoolClubOrTeam", request.SelectedSchoolClubOrTeam);
                    parameters.AddWithValue("@SportId", request.SportId);
                    parameters.AddWithValue("@ClassYearId", request.ClassYearId);
                    parameters.AddWithValue("@SportPositionIdsJson", request.SportPositionId.ToString());
                    parameters.AddWithValue("@Comments", request.Comments);
                    parameters.AddWithValue("@SportLevelId", request.SportLevelId);
                });
        }
        public ItemsResponse<AthleteSportTeam> GetAllByUserId(int userId)
        {
            ItemsResponse<AthleteSportTeam> itemsResponse = new ItemsResponse<AthleteSportTeam>();
            Dictionary<int, AthleteSportTeam> athleteSportTeamById = new Dictionary<int, AthleteSportTeam>();
            dataProvider.ExecuteCmd(
                "AthleteSportTeam_GetByUserId",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                (reader, resultSetIndex) =>
                {
                    switch (resultSetIndex)
                    {
                        case 0:
                            {
                                AthleteSportTeam athleteSportTeam = new AthleteSportTeam
                                {
                                    Id = (int)reader["Id"],
                                    UserId = (int)reader["UserId"],
                                    SportId = (int)reader["SportId"],
                                    SportLevelId = (int)reader["SportLevelId"],
                                    ClassYearId = (int)reader["ClassYearId"],
                                    SportName = (string)reader["SportName"],
                                    ClassYear = (string)reader["ClassYear"],
                                    SchoolName = reader.GetSafeString("SchoolName"),
                                    SportLevel = (string)reader["SportLevel"],
                                    SelectedSchoolClubOrTeam = (int)reader["SelectedSchoolClubOrTeam"],
                                    SchoolId = reader.GetSafeInt32Nullable("SchoolId"),
                                    ClubName = reader.GetSafeString("ClubName"),
                                    TeamName = reader.GetSafeString("TeamName"),
                                    Comments = reader.GetSafeString("Comments")
                                };
                                athleteSportTeamById.Add(athleteSportTeam.Id, athleteSportTeam);
                                break;
                            }
                        case 1:
                            {
                                SportPositionBasic sportPositionBasic = new SportPositionBasic
                                {
                                    SportPositionId = (int)reader["SportPositionId"],
                                    Name = (string)reader["SportPositionName"],
                                    Code = (string)reader["Code"]
                                };
                                int id = (int)reader["Id"];
                                AthleteSportTeam athleteSportTeam = athleteSportTeamById[id];
                                athleteSportTeam.SportPositionIds.Add(sportPositionBasic);
                                break;
                            }
                    }
                });
            itemsResponse.Items = new List<AthleteSportTeam>(athleteSportTeamById.Values);
            return itemsResponse;
        }
        public void Delete(int AthleteTeamId)
        {
            dataProvider.ExecuteNonQuery(
            "AthleteTeam_Delete",
            (parameters) =>
            {
                parameters.AddWithValue("@AthleteTeamId", AthleteTeamId);
            });
        }
    }
}