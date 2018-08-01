using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{

    public class SportServices : ISportServices
    {
        readonly IDataProvider dataProvider;

        public SportServices(IDataProvider dataProvider)

        {
            this.dataProvider = dataProvider;
        }

        public List<Sport> GetAll()
        {
            List<Sport> listOfSports = new List<Sport>();
            Dictionary<int, Sport> dictionaryOfSports = new Dictionary<int, Sport>();

            dataProvider.ExecuteCmd(
                "Sport_SelectAll",
                (parameters) =>
                { },
                (reader, resultSetIndex) =>
                {
                    switch (resultSetIndex)
                    {
                        case 0:
                    Sport sport = new Sport
                    {
                        Id = (int)reader["Id"],
                        Code = (string)reader["Code"],
                        Name = (string)reader["Name"],
                        DisplayOrder = (int)reader["DisplayOrder"],
                        Inactive = (bool)reader["Inactive"],
                        Gender = (string)reader["Gender"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                    };
                    listOfSports.Add(sport);
                            dictionaryOfSports.Add(sport.Id, sport);
                            break;
                        case 1:
                            SportPosition sportPosition = new SportPosition
                            {
                                Id = (int)reader["Id"],
                                Code = (string)reader["Code"],
                                Name = (string)reader["Name"],
                                Inactive = (bool)reader["Inactive"],
                                DateCreated = (DateTime)reader["DateCreated"],
                                DateModified = (DateTime)reader["DateModified"],
                            };
                            int sportId = (int)reader["sportId"];
                            if (dictionaryOfSports.ContainsKey(sportId))
                            {
                                Sport parent = dictionaryOfSports[sportId];
                                if (parent.Positions == null)
                                {
                                    parent.Positions = new List<SportPosition>();
                                }
                                parent.Positions.Add(sportPosition);
                            }
                            break;

                    }



                });
            return listOfSports;
        }

        public int Create(SportCreateRequest request)
        {
            int newId = 0;


            dataProvider.ExecuteNonQuery(
                "Sport_Insert",
                (parameters) =>
                {

                    parameters.AddWithValue("@Code", request.Code);
                    parameters.AddWithValue("@Name", request.Name);
                    parameters.AddWithValue("@DisplayOrder", request.DisplayOrder);
                    parameters.AddWithValue("@Inactive", request.Inactive);
                    parameters.AddWithValue("@Gender", request.Gender);
                    

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });

            if (request.Positions != null)
            {
                foreach (var position in request.Positions)
                {
                    dataProvider.ExecuteNonQuery(
                   "SportPosition_Insert",
                   (parameters) =>
                   {

                       parameters.AddWithValue("@Code", position.Code);
                       parameters.AddWithValue("@Name", position.Name);
                       parameters.AddWithValue("@Inactive", position.Inactive);
                       parameters.AddWithValue("@sportID", newId);


                       parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                   });
                }
            }
            return newId;
        }

        public void Update(SportUpdateRequest request)
        {
            dataProvider.ExecuteNonQuery(
                "Sport_Update",
                (parameters) =>
                {

                    parameters.AddWithValue("@Code", request.Code);
                    parameters.AddWithValue("@Name", request.Name);
                    parameters.AddWithValue("@DisplayOrder", request.DisplayOrder);
                    parameters.AddWithValue("@Inactive", request.Inactive);
                    parameters.AddWithValue("@Gender", request.Gender);
                    parameters.AddWithValue("@Id", request.Id);
                });

            foreach (var position in request.Positions)
            {
                dataProvider.ExecuteNonQuery(
               "SportPosition_Update",
               (parameters) =>
               {
                   parameters.AddWithValue("@Code", position.Code);
                   parameters.AddWithValue("@Name", position.Name);
                   parameters.AddWithValue("@Inactive", position.Inactive);
                   parameters.AddWithValue("@sportID", request.Id);
                   parameters.AddWithValue("@Id", position.Id);
               });

            }
        }

        public void Delete(int Id)
        {
            dataProvider.ExecuteNonQuery(
                "Sport_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", Id);
                });


        }

        public Sport GetById(int id)
        {
            Sport sport = null;




            dataProvider.ExecuteCmd(
                "Sport_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                (reader, resultSetIndex) =>
                {
                    switch (resultSetIndex)
                    {
                        case 0:
                    sport = new Sport
                    {
                        Id = (int)reader["Id"],
                        Code = (string)reader["Code"],
                        Name = (string)reader["Name"],
                        DisplayOrder = (int)reader["DisplayOrder"],
                        Inactive = (bool)reader["Inactive"],
                        Gender = (string)reader["Gender"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                    };
                            break;
                        case 1:
                            SportPosition sportPosition = new SportPosition
                            {
                                Id = (int)reader["Id"],
                                Code = (string)reader["Code"],
                                Name = (string)reader["Name"],
                                Inactive = (bool)reader["Inactive"],
                                DateCreated = (DateTime)reader["DateCreated"],
                                DateModified = (DateTime)reader["DateModified"],
                            };
                   
                            if (sport.Positions == null)
                            {
                                sport.Positions = new List<SportPosition>();
                            }
                            sport.Positions.Add(sportPosition);

                            break;
                    }
             
                });
            return sport;
        }

    }
}
