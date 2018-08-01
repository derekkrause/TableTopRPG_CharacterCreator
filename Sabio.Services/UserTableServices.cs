using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;

namespace Sabio.Services
{
    public class UserTableServices : IUserTableService
    {
        readonly IDataProvider dataProvider;

        public UserTableServices(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
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
                    parameters.AddWithValue("@MiddleName", request.MiddleName);
                    parameters.AddWithValue("@LastName", request.LastName);
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

            return pagedItemResponse;
            
        }

        public User GetById(int id)
        {
            User user = null;

            dataProvider.ExecuteCmd(
                "User_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@id", id);
                },
                (reader, resultSetIndex) =>
                {
                    user = new User
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

                    object MiddleNameValue = reader["MiddleName"];
                    if (MiddleNameValue != DBNull.Value)
                    {
                        user.MiddleName = (string)MiddleNameValue;
                    };

                }
                
                );
                    return user;
        }

        public int Login(UserLoginRequest request)
        {
            string storedPassword = "";
            string passwordInput = request.Password;
            int userId = 0;

            dataProvider.ExecuteCmd(
                "User_Login",
                (parameters) =>
                {
                    parameters.AddWithValue("@Email", request.Email);
                },
                (reader, resultSetIndex) =>
                {
                    storedPassword = (string)reader["PasswordHash"];
                    userId = (int)reader["Id"];
                });

            //bool pwMatch = BCrypt.Net.BCrypt.Verify(passwordInput, storedPassword);
            if (BCrypt.Net.BCrypt.Verify(passwordInput, storedPassword))
            {
                return userId;
            }
            else
            {
                return 0;
            }
        }
        
        public void Update(UserUpdateRequest request)
        {
            string passHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

            dataProvider.ExecuteNonQuery(
                "User_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", request.Id);
                    parameters.AddWithValue("@FirstName", request.FirstName);
                    parameters.AddWithValue("@MiddleName", request.MiddleName ?? (object)DBNull.Value);
                    parameters.AddWithValue("@LastName", request.LastName);
                    parameters.AddWithValue("@Gender", request.Gender);
                    parameters.AddWithValue("@AvatarUrl", request.AvatarUrl);
                    parameters.AddWithValue("@Email", request.Email);
                    parameters.AddWithValue("@PasswordHash", passHash);
                });
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery(
                "User_Delete",
                (parameters) => parameters.AddWithValue("@id", id)
            );
        }
    }
}
