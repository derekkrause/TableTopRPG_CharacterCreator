using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Data.Services
{
    public class AdvocateService
    {

        readonly IDataProvider dataProvider;

        public AdvocateService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<Advocate> SelectAllAdvocate()
        {
            PagedItemResponse<Advocate> pagedItemResponse = new PagedItemResponse<Advocate>();
            List<Advocate> advocateList = new List<Advocate>();

            dataProvider.ExecuteCmd(
                "Advocate_Select",
                (parameters) =>
                {

                },
                (reader, resultSetIndex) =>
                {
                    Advocate advocate = new Advocate
                    {
                        Id = (int)reader["Id"],
                        UserId = (int)reader["UserId"],
                        Title = (string)reader["Title"],
                        ShortBio = (string)reader["ShortBio"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };

                    object CollegeId = reader["CollegeId"];
                    if (CollegeId != DBNull.Value)
                    {
                        advocate.CollegeId = (int)CollegeId;
                    }

                    object HighSchoolId = reader["HighSchoolId"];
                    if (HighSchoolId != DBNull.Value)
                    {
                        advocate.HighSchoolId = (int)HighSchoolId;
                    }
                    advocateList.Add(advocate);
                    pagedItemResponse.PagedItems = advocateList;
                });

            return pagedItemResponse;
        }

        public int InsertAdvocate(AdvocateInsert advocateInsert)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Advocate_Insert",
                (parameters) =>
            {
                parameters.AddWithValue("@UserId", advocateInsert.UserId);
                parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

            },
                (parameters) =>
                {

                    newId = (int)parameters["@Id"].Value;

                });

            return newId;
        }

        public void UpdateAdvocate(AdvocateUpdate advocateUpdate)
        {

            dataProvider.ExecuteNonQuery(
                "Advocate_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", advocateUpdate.Id);
                    parameters.AddWithValue("@UserId", advocateUpdate.UserId);
                    parameters.AddWithValue("@CollegeId", advocateUpdate.CollegeId);
                    parameters.AddWithValue("@HighSchoolId", advocateUpdate.HighSchoolId);
                    parameters.AddWithValue("@Title", advocateUpdate.Title);
                    parameters.AddWithValue("@ShortBio", advocateUpdate.ShortBio);
                });
        }

        public void DeleteAdvocate(int advocateId)
        {

            dataProvider.ExecuteNonQuery(
                "Advocate_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", advocateId);

                });
        }
    }
}




