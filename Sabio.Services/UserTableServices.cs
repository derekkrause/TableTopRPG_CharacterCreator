using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using Sabio.Data.Providers;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Models.Domain;

namespace Sabio.Services
{
    public class UserTableServices
    {
        readonly IDataProvider dataProvider;

        public UserTableServices(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<User> GetAll(int pageIndex, int pageSize)
        {
            PagedItemResponse<User> pagedItemResponse = new PagedItemResponse<User>();
            List<User> userList = new List<User>();

            dataProvider.ExecuteCmd(
                "User_SelectAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    User user = new User
                    {
                        Id = (int)reader["Id"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        Gender = (int)reader["Gender"],
                        AvatarUrl = (string)reader["AvatarUrl"],
                        Email = (string)reader["Email"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };

                    object middleNameObj = reader["MiddleName"];
                    if (middleNameObj != DBNull.Value)
                    {
                        user.MiddleName = (string)middleNameObj;
                    }

                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];

                    userList.Add(user);
                });

            pagedItemResponse.PagedItems = userList;

            return pagedItemResponse;
        }
        
        public int Create(UserCreateRequest request)
        {
            int newId = 0;
            string passHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

            dataProvider.ExecuteNonQuery(
                "User_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@FirstName", request.FirstName);
                    parameters.AddWithValue("@MiddleName", request.MiddleName ?? (object)DBNull.Value);
                    parameters.AddWithValue("@LastName", request.LastName);
                    parameters.AddWithValue("@Gender", request.Gender);
                    parameters.AddWithValue("@AvatarUrl", request.AvatarUrl);
                    parameters.AddWithValue("@Email", request.Email);
                    parameters.AddWithValue("@PasswordHash", passHash);
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });

            return newId;
        }
    }
}
