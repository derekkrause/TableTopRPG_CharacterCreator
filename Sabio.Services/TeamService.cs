using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class TeamService
    {
        readonly IDataProvider dataProvider;

        public TeamService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<Team> GetTeamsByAdvocateId(int userId)
        {
            PagedItemResponse<Team> pagedItemResponse = new PagedItemResponse<Team>();
            List<Team> teamList = new List<Team>();

            dataProvider.ExecuteCmd(
                "Team_SelectByIdAdvocate",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                (reader, resultSetIndex) =>
                {
                    Team team = new Team
                    {
                        Id = (int)reader["Id"],
                        SportId = (int)reader["SportId"],
                        SportLevelId = (int)reader["SportLevelId"],
                        UserId = (int)reader["UserId"],
                        Name = (string)reader["Name"],
                        SchoolName = (string)reader["SchoolName"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (int)reader["Zip"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]

                    };

                    object SchoolId = reader["SchoolId"];
                    if (SchoolId != DBNull.Value)
                    {
                        team.SchoolId = (int)SchoolId;
                    }

                    teamList.Add(team);
                    pagedItemResponse.PagedItems = teamList;

                });

            return pagedItemResponse;

        }

        public ItemResponse<Team> GetTeamById(int teamId)
        {
            ItemResponse<Team> itemResponse = new ItemResponse<Team>();

            dataProvider.ExecuteCmd(
                "Team_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", teamId);
                },
                (reader, resultSetIndex) =>
                {
                    Team team = new Team
                    {
                        Id = (int)reader["Id"],
                        SportId = (int)reader["SportId"],
                        SportLevelId = (int)reader["SportLevelId"],
                        Name = (string)reader["Name"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (int)reader["Zip"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]

                    };

                    object SchoolId = reader["SchoolId"];
                    if (SchoolId != DBNull.Value)
                    {
                        team.SchoolId = (int)SchoolId;
                    }

                    itemResponse.Item = team;
                });

            return itemResponse;

        }

        public int InsertTeam(TeamInsert teamInsert)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Team_Insert",
                (parameters) =>
                {
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    parameters.AddWithValue("@SportId", teamInsert.SportId);
                    parameters.AddWithValue("@SportLevelId", teamInsert.SportLevelId);
                    parameters.AddWithValue("@SchoolId", teamInsert.SchoolId ?? (object)DBNull.Value);
                    parameters.AddWithValue("@Name", teamInsert.Name);
                    parameters.AddWithValue("@City", teamInsert.City);
                    parameters.AddWithValue("@State", teamInsert.State);
                    parameters.AddWithValue("@Zip", teamInsert.Zip);

                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });

            return newId;

        }

        public void UpdateTeam(TeamUpdate teamUpdate)
        {

            dataProvider.ExecuteNonQuery(
                "Team_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", teamUpdate.Id);
                    parameters.AddWithValue("@SportId", teamUpdate.SportId);
                    parameters.AddWithValue("@SportLevelId", teamUpdate.SportLevelId);
                    parameters.AddWithValue("@SchoolId", teamUpdate.SchoolId ?? (object)DBNull.Value);
                    parameters.AddWithValue("@Name", teamUpdate.Name);
                    parameters.AddWithValue("@City", teamUpdate.City);
                    parameters.AddWithValue("@State", teamUpdate.State);
                    parameters.AddWithValue("@Zip", teamUpdate.Zip);

                });
        }

        public void DeleteTeam(int teamId)
        {

            dataProvider.ExecuteNonQuery(
                "Team_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", teamId);
                });
        }
    }
}
