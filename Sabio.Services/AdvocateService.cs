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
using Sabio.Data;

namespace Sabio.Data.Services
{
    public class AdvocateService
    {

        readonly IDataProvider dataProvider;

        public AdvocateService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public ItemResponse<Advocate> SelectAdvocateById(int advocateId)
        {
            ItemResponse<Advocate> itemResponse = new ItemResponse<Advocate>();
          
            dataProvider.ExecuteCmd(
                "Advocate_SelectByUserId",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", advocateId);
                },
                (reader, resultSetIndex) =>
                {
                    Advocate advocate = new Advocate
                    {
                        Id = (int)reader["Id"],
                        UserId = (int)reader["UserId"],                 
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        AvatarUrl = reader.GetSafeString("AvatarUrl"),
                        Email = reader.GetSafeString("Email"),
                        //Name = reader.GetSafeString("Name"),
                        PasswordHash = (string)reader["PasswordHash"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };


                    object MiddleName = reader["MiddleName"];
                    if (MiddleName != DBNull.Value)
                    {
                        advocate.MiddleName = (string)MiddleName;
                    }

                    object HighSchoolId = reader["HighSchoolId"];
                    if (HighSchoolId != DBNull.Value)
                    {
                        advocate.HighSchoolId = (int)HighSchoolId;
                    }

                    object Title = reader["Title"];
                    if (Title != DBNull.Value)
                    {
                        advocate.Title = (string)Title;
                    }

                    object ShortBio = reader["ShortBio"];
                    if (ShortBio != DBNull.Value)
                    {
                        advocate.ShortBio = (string)ShortBio;
                    }

                    object Name = reader["Name"];
                    if (Name != DBNull.Value)
                    {
                        advocate.Name = (string)Name;
                    }

                    itemResponse.Item = advocate;
                });

            return itemResponse;
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
                    parameters.AddWithValue("@HighSchoolId", advocateUpdate.HighSchoolId ?? (object)DBNull.Value);
                    parameters.AddWithValue("@Title", advocateUpdate.Title ?? (object)DBNull.Value);
                    parameters.AddWithValue("@ShortBio", advocateUpdate.ShortBio ?? (object)DBNull.Value);
                    parameters.AddWithValue("@FirstName", advocateUpdate.FirstName);
                    parameters.AddWithValue("@LastName", advocateUpdate.LastName);
                    //parameters.AddWithValue("@AvatarUrl", advocateUpdate.AvatarUrl);
                    parameters.AddWithValue("@Email", advocateUpdate.Email);
                    parameters.AddWithValue("@Name", advocateUpdate.Name ?? (object)DBNull.Value);
                    parameters.AddWithValue("@PasswordHash", advocateUpdate.PasswordHash);
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




