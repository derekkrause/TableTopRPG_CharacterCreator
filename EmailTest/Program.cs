using Sabio.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var confirmationEmailService = new EmailService();
            confirmationEmailService.Execute().Wait();
        }
    }
}
