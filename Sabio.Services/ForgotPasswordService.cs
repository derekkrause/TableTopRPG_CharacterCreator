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

        //public async Task<Response> Execute(Email email)
        //{
        //    //var apiKey = "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";

        //    string apiKey = configuration.SendGridKey;
        //    var client = new SendGridClient(apiKey);

        //    ForgotPasswordEmail forgotPasswordEmail = new ForgotPasswordEmail
        //    {
        //        FromAddress = email.FromAddress,
        //        FromName = email.FromName,
        //        ToAddress = email.ToAddress,
        //        ToName = email.ToName,
        //        Message = email.Message,
        //        Subject = email.Subject,
        //        Link = email.Link
        //    };
        //}

        //private static void Main()
        //{
        //    Execute().Wait();
        //}

        private async Task Execute()
        {
            //var apiKey = Environment.GetEnvironmentVariable("NAME_OF_THE_ENVIRONMENT_VARIABLE_FOR_YOUR_SENDGRID_KEY");
            //var client = new SendGridClient(apiKey);
            //var from = new EmailAddress("test@example.com", "Example User");
            //var subject = "Sending with SendGrid is Fun";
            //var to = new EmailAddress("test@example.com", "Example User");
            //var plainTextContent = "and easy to do anywhere, even with C#";
            //var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            //var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            //var response = await client.SendEmailAsync(msg);

            //var apiKey = Environment.GetEnvironmentVariable("NAME_OF_THE_ENVIRONMENT_VARIABLE_FOR_YOUR_SENDGRID_KEY");
            //var client = new SendGridClient(apiKey);
            //var msg = new SendGridMessage()
            //{
            //    From = new EmailAddress("test@example.com", "DX Team"),
            //    Subject = "Sending with SendGrid is Fun",
            //    PlainTextContent = "and easy to do anywhere, even with C#",
            //    HtmlContent = "<strong>and easy to do anywhere, even with C#</strong>"
            //};
            //msg.AddTo(new EmailAddress("test@example.com", "Test User"));
            //var response = await client.SendEmailAsync(msg);

            string apiKey = configuration.SendGridKey;
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("test@example.com", "DX Team"),
                Subject = "Sending with SendGrid is Fun",
                PlainTextContent = "and easy to do anywhere, even with C#",
                HtmlContent = "<strong>and easy to do anywhere, even with C#</strong>"
            };
            msg.AddTo(new EmailAddress("test@example.com", "Test User"));
            var response = await client.SendEmailAsync(msg);
        }

        public bool CheckEmail(ForgotPasswordEmailRequest theEmail)
        {
            // Check e-mail against DB
            //ForgotPasswordEmailRequest forgotPasswordEmail = eMail;
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
            // Send out e-mail
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
                    parameters.AddWithValue("@TokenTypeId", 2);  // 1 for Registration, 2 for Forgot Password
                });

            Email email = new Email()
            {
                FromAddress = "RecruitHubSports@dispostable.com",
                FromName = "RecruitHubSports",
                ToAddress = eMail,
                ToName = firstName + " " + lastName,
                Message = File.ReadAllText(@"C:\SF.Code\C57\ProspectScout\Sabio.Services\ResetPasswordConfirmation_HTML.txt"),
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
                //emailConfirmation.Confirmed = reader.GetSafeBool("Confirmed");
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

        //public void UpdateConfirmed(ForgotPasswordUpdateRequest forgotPasswordUpdateRequest, string tokenId)  // Old version
        //{
        //    dataProvider.ExecuteNonQuery("EmailConfirmation_UpdateConfirmed", (parameters) =>
        //    {
        //        parameters.AddWithValue("@TokenId", forgotPasswordUpdateRequest.TokenId);
        //        parameters.AddWithValue("@Confirmed", forgotPasswordUpdateRequest.Confirmed);
        //    });
        //}

        public void UpdateConfirmed(string tokenId)  // Updated version
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
                PasswordHash = forgotPasswordUpdateRequest.Password
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
