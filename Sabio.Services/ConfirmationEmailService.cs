using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class EmailService /*: IEmailService*/
    {
        
        public async Task Execute(/*string fromAddress, string fromName, string toAddress, string toName, string subject, string plainTextContent, string htmlContent*/)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            //var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var msg = new SendGridMessage()
            {
                //Need to create an HTML message to call below.
                From = new EmailAddress("RecruitHubSports@dispostable.com", "RecruitHubSports Welcome"), //Both parameters will be variables
                Subject = "Registration Confirmation",
                PlainTextContent = "Confirm your registration by copying the link and pasting it into your browser address bar. /link here/",
                HtmlContent = "<strong>Welcome to Recruit Hub Sports!</strong><br><br><p>Please click the following link to confirm your registration:</p>/link here/",
            };
            
            msg.AddTo(new EmailAddress("newRHSuser@dispostable.com", "New User")); //Change email address and recipient with variables.
            var response = await client.SendEmailAsync(msg);
            
        }
    }
}
