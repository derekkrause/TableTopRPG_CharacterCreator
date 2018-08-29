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
    public class GameService
    {
        readonly IDataProvider dataProvider;

        public GameService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<Game> GetAllGames()
        {
            PagedItemResponse<Game> pagedItemResponse = new PagedItemResponse<Game>();
            List<Game> gameList = new List<Game>();

            dataProvider.ExecuteCmd(
                "Game_SelectAll",
                (parameters) =>
                {

                },
                (reader, ResultSetIndex) =>
                {
                    Game game = new Game
                    {
                        Id = (int)reader["Id"],
                        TeamId = (int)reader["TeamId"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };

                    object Opponent = reader["Opponent"];
                    if (Opponent != DBNull.Value)
                    {
                        game.Opponent = (string)Opponent;
                    }

                    object StartDate = reader["StartDate"];
                    if (StartDate != DBNull.Value)
                    {
                        game.StartDate = (DateTime)StartDate;
                    }

                    object EndDate = reader["EndDate"];
                    if (EndDate != DBNull.Value)
                    {
                        game.EndDate = (DateTime)EndDate;
                    }


                    gameList.Add(game);
                    pagedItemResponse.PagedItems = gameList;
                });

            return pagedItemResponse;
        }

        public ItemResponse<Game> GetGameById(int gameId)
        {
            ItemResponse<Game> itemResponse = new ItemResponse<Game>();

            dataProvider.ExecuteCmd(
                "Game_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", gameId);
                },
                (reader, ResultSetIndex) =>
                {
                    Game game = new Game
                    {
                        Id = (int)reader["Id"],
                        TeamId = (int)reader["TeamId"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };

                    object Opponent = reader["Opponent"];
                    if (Opponent != DBNull.Value)
                    {
                        game.Opponent = (string)Opponent;
                    }

                    object StartDate = reader["StartDate"];
                    if (StartDate != DBNull.Value)
                    {
                        game.StartDate = (DateTime)StartDate;
                    }

                    object EndDate = reader["EndDate"];
                    if (EndDate != DBNull.Value)
                    {
                        game.EndDate = (DateTime)EndDate;
                    }

                    itemResponse.Item = game;
                });

            return itemResponse;
        }

        public int InsertGame(GameInsert gameInsert)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Game_Insert",
                (parameters) =>
                {
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    parameters.AddWithValue("@TeamId", gameInsert.TeamId);
                    parameters.AddWithValue("@Opponent", gameInsert.Opponent ?? (object)DBNull.Value);
                    parameters.AddWithValue("@StartDate", gameInsert.StartDate ?? (object)DBNull.Value);
                    parameters.AddWithValue("@EndDate", gameInsert.EndDate ?? (object)DBNull.Value);

                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;

                });

            return newId;
        }

        public void UpdateGame(GameUpdate gameUpdate)
        {

            dataProvider.ExecuteNonQuery(
                "Game_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", gameUpdate.Id);
                    parameters.AddWithValue("@TeamId", gameUpdate.TeamId);
                    parameters.AddWithValue("@Opponent", gameUpdate.Opponent ?? (object)DBNull.Value);
                    //parameters.AddWithValue("@StartDate", gameInsert.StartDate ?? (object)DBNull.Value);
                    //parameters.AddWithValue("@EndDate", gameInsert.EndDate ?? (object)DBNull.Value);

                });
        }

        public void DeleteGame(int gameId)
        {

            dataProvider.ExecuteNonQuery(
                "Game_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", gameId);
                });
        }
    }
}
