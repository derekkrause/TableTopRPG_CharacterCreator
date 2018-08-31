using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ForgotPasswordService
    {
        readonly IDataProvider dataProvider;
        readonly IEmailService emailService;
        readonly IConfiguration configuration;
        readonly IUserTableService userTableService;
        readonly IAuthenticationService authenticationService;

        public ForgotPasswordService(IDataProvider dataProvider, IEmailService emailService, IConfiguration configuration, 
            IUserTableService userTableService, IAuthenticationService authenticationService)
        {
            this.dataProvider = dataProvider;
            this.emailService = emailService;
            this.configuration = configuration;
            this.userTableService = userTableService;
            this.authenticationService = authenticationService;
        }

        public bool CheckEmail(ForgotPasswordEmailRequest theEmail)
        {
            string eMail = theEmail.EMail;

            string storedPassword = "";
            int userId = 0;
            string firstName = "";
            string lastName = "";
            bool isAdmin = false;

            dataProvider.ExecuteCmd(
                "User_Login",
                (parameters) =>
                {
                    parameters.AddWithValue("@Email", eMail);
                },
                (reader, resultSetIndex) =>
                {
                    storedPassword = (string)reader["PasswordHash"];
                    userId = (int)reader["Id"];
                    firstName = (string)reader["FirstName"];
                    lastName = (string)reader["LastName"];
                    isAdmin = (bool)reader["Admin"];
                });

            if (storedPassword != "")
            {
                return true;
            } else
            {
                return false;
            };
        }

        public async Task<Response> SendEmail(ForgotPasswordEmailRequest theEmail)
        {
            string eMail = theEmail.EMail;

            string storedPassword = "";
            int userId = 0;
            string firstName = "";
            string lastName = "";
            bool isAdmin = false;

            dataProvider.ExecuteCmd(
                "User_Login",
                (parameters) =>
                {
                    parameters.AddWithValue("@Email", eMail);
                },
                (reader, resultSetIndex) =>
                {
                    storedPassword = (string)reader["PasswordHash"];
                    userId = (int)reader["Id"];
                    firstName = (string)reader["FirstName"];
                    lastName = (string)reader["LastName"];
                    isAdmin = (bool)reader["Admin"];
                });

            string domain = configuration.UrlOrigin;
            string webRoute = "/#/app/forgot-password/reset-password/";
            string tokenId = Guid.NewGuid().ToString();

            dataProvider.ExecuteNonQuery(
                "EmailConfirmation_Insert",
                (parameters) =>
                {
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    parameters.AddWithValue("@RegEmail", eMail);
                    parameters.AddWithValue("@TokenId", tokenId);
                    parameters.AddWithValue("@TokenTypeId", 2);
                });

            Email email = new Email()
            {
                FromAddress = "RecruitHubSports@dispostable.com",
                FromName = "RecruitHubSports",
                ToAddress = eMail,
                ToName = firstName + " " + lastName,
                Message = EmbeddedResource.Get("ResetPasswordConfirmation_HTML.txt"),
                Subject = "Reset Password",
                Link = domain + webRoute + tokenId
            };

            var response = emailService.Execute(email);

            return await response;
        }

        public ForgotPasswordEmailConfirmation GetByTokenId(string tokenId)
        {
            ForgotPasswordEmailConfirmation emailConfirmation = new ForgotPasswordEmailConfirmation();

            dataProvider.ExecuteCmd("EmailConfirmation_SelectByTokenId", (parameters) =>
            {
                parameters.AddWithValue("@TokenId", tokenId);
            }, (reader, resultSetIndex) =>
            {
                emailConfirmation.Id = (int)reader["Id"];
                emailConfirmation.RegEmail = (string)reader["RegEmail"];
                emailConfirmation.TokenId = (string)reader["TokenId"];
                emailConfirmation.TokenTypeId = (int)reader["TokenTypeId"];
                emailConfirmation.Confirmed = (bool)reader["Confirmed"];
                emailConfirmation.DateCreated = (DateTime)reader["DateCreated"];
                emailConfirmation.UserId = (int)reader["UserId"];
                emailConfirmation.UserFirstName = (string)reader["UserFirstName"];
                emailConfirmation.UserLastName = (string)reader["UserLastName"];

                object dateModifiedObj = reader["DateModified"];
                if (dateModifiedObj != DBNull.Value)
                {
                    emailConfirmation.DateModified = (DateTime)dateModifiedObj;
                }
            });

            if (tokenId == emailConfirmation.TokenId && emailConfirmation.TokenTypeId == 2)
            {
                UpdateConfirmed(emailConfirmation.TokenId);
                emailConfirmation.Confirmed = true;
            }

            return emailConfirmation;
        }
        
        public void UpdateConfirmed(string tokenId)
        {
            dataProvider.ExecuteNonQuery("EmailConfirmation_UpdateConfirmed", (parameters) =>
            {
                parameters.AddWithValue("@TokenId", tokenId);
            });
        }

        public void UpdatePassword(ForgotPasswordUpdateRequest forgotPasswordUpdateRequest)
        {
            string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(forgotPasswordUpdateRequest.Password);

            ForgotPasswordEmailConfirmation forgotPassword = GetByTokenId(forgotPasswordUpdateRequest.TokenId);

            User user = userTableService.GetById(forgotPassword.UserId);

            UserUpdateRequest userUpdateRequest = new UserUpdateRequest()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                Gender = user.Gender,
                AvatarUrl = user.AvatarUrl,
                Email = user.Email,
                PasswordHash = forgotPasswordUpdateRequest.Password,
                CurrentSportId = user.CurrentSportId
            };

            userTableService.Update(userUpdateRequest);

            UserLoginRequest userLoginRequest = new UserLoginRequest()
            {
                Email = forgotPasswordUpdateRequest.Email,
                Password = forgotPasswordUpdateRequest.Password
            };

            UserBase userBase = userTableService.Login(userLoginRequest);

            authenticationService.LogIn(new UserBase
            {
                Id = userBase.Id,
                Name = userBase.Name,
                Roles = userBase.Roles
            });
        }
    }
}
