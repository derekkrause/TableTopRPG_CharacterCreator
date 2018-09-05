using Sabio.Services.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        readonly IConfiguration configuration;

        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<Response> Execute(Email email)
        {
            var apiKey = configuration.SendGridKey;
            var client = new SendGridClient(apiKey);

            string link = email.Link;
            string subject = email.Subject; //create an if/else statement

            //Prepare email Body
            string messageBody = email.Message;
            messageBody = messageBody.Replace("@recipientName", email.ToName);
            messageBody = messageBody.Replace("@link", link);

            var msg = new SendGridMessage()
            {
                //Need to create an HTML message to call below.
                From = new EmailAddress(email.FromAddress, email.FromName), //Both parameters will be variables
                Subject = subject, 
                PlainTextContent = "Welcome, " + email.ToName + "! To complete your registration, confirm your account by copying the below link and pasting it into your address bar: " + link,
                HtmlContent = messageBody
            };

            msg.AddTo(new EmailAddress(email.ToAddress, email.ToName)); //Change email address and recipient with variables.

            var response = await client.SendEmailAsync(msg);

            return response;
            //todo: create a response handler for anything >= 200 < 300
            //todo: create catches for apiKey errors
        }
    }

    public class Email
    {
        public string FromAddress { get; set; }
        public string FromName { get; set; }
        public string ToAddress { get; set; }
        public string ToName { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }
        public string Link { get; set; }
    }
}
