using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UserTableServices : IUserTableService
    {
        readonly IDataProvider dataProvider;
        //readonly IEmailService emailService;
        readonly EmailService emailService;
        readonly string domain = "http://localhost:3001/#/app";

        public UserTableServices(IDataProvider dataProvider, EmailService emailService)
        {
            this.dataProvider = dataProvider;
            this.emailService = emailService;
        }

        public async Task<Response> Create(UserCreateRequest request)
        {
            int newId = 0;
            string passHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);
            string tokenId= Guid.NewGuid().ToString();
            UserResendRequest resendRequest = new UserResendRequest()
            {
                Email = request.Email
            };

            try
            {
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

            } 
            catch (SqlException ex) when (ex.Number == 2627)
            {
                throw new DuplicateEmailException();
            }

            return await Resend(resendRequest);

        }

        public async Task<Response> Resend(UserResendRequest request)
        {
            string tokenId = Guid.NewGuid().ToString();
            string FirstName = "";
            string LastName = "";
            string Email = request.Email;

            dataProvider.ExecuteCmd(
                "User_SelectByEmail",
                (parameters) =>
                {
                    parameters.AddWithValue("@Email", Email);
                },
                (reader, resultSetIndex) =>
                {
                    FirstName = (string)reader["FirstName"];
                    LastName = (string)reader["LastName"];
                });

            dataProvider.ExecuteNonQuery(
                "EmailConfirmation_Insert",
                (parameters) =>
                {
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    parameters.AddWithValue("@RegEmail", Email);
                    parameters.AddWithValue("@TokenId", tokenId);
                    parameters.AddWithValue("@TokenTypeId", 1);
                });

            Email email = new Email()
            {
                FromAddress = "RecruitHubSports@dispostable.com",
                FromName = "RecruitHubSports",
                ToAddress = Email,
                ToName = FirstName + " " + LastName,
                Message = File.ReadAllText(@"C:\SF.Code\C57\ProspectScout\Sabio.Services\RegistrationConfirmationEmail_HTML.txt"),
                Subject = "Registration Confirmation",
                Link = domain + "/registration_confirmation/?token=" + tokenId
            };

            return await emailService.Execute(email);
        }

        public void Confirm(UserConfirmRequest request)
        {
            dataProvider.ExecuteNonQuery(
                "EmailConfirmation_UpdateConfirmed",
                (parameters) =>
                {
                    parameters.AddWithValue("@TokenId", request.TokenId);
                });
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
                            Gender = reader.GetSafeInt32Nullable("Gender"),
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
                        Gender = reader.GetSafeInt32Nullable("Gender"),
                        AvatarUrl = (string)reader["AvatarUrl"],
                        Email = (string)reader["Email"],
                        IsAthlete = (bool)reader["IsAthlete"],
                        IsCoach = (bool)reader["IsCoach"],
                        IsAdvocate = (bool)reader["IsAdvocate"],
                        IsAdmin = (bool)reader["Admin"],
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

        public UserBase Login(UserLoginRequest request)
        {
            string storedPassword = "";
            int userId = 0;
            string firstName = "";
            string lastName = "";
            bool isAdmin = false;
            bool confirmed = false;

            try
            {
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
                        firstName = (string)reader["FirstName"];
                        lastName = (string)reader["LastName"];
                        isAdmin = (bool)reader["Admin"];
                        confirmed = (bool)reader["Confirmed"];
                    });

                if (BCrypt.Net.BCrypt.Verify(request.Password, storedPassword))
                {
                    return new UserBase
                    {
                        Id = userId,
                        Name = firstName + " " + lastName,
                        Roles = isAdmin ? new[] { "Admin" } : new string[0]
                    };
                }
                else
                {
                    return null;
                }
            }
            catch (SqlException ex) when (ex.Number == 50000)
            {
                throw new UnconfirmedAccountException();
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
                parameters.AddWithValue("@Gender", request.Gender ?? (object)DBNull.Value);
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
