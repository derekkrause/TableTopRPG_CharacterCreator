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
            dataProvider.ExecuteCmd(
                "Sport_SelectAll",
                (parameters) =>
                {},
                (reader, resultSetIndex) =>
                {
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
                   
             
                });
            return sport;
        }

    }
}
