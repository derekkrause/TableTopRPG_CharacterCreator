using Sabio.Services.Interfaces;

namespace Sabio.Services
{
    // Note: this is a temporary class. We need a better implementation
    // of IConfiguration that uses the database.
    public class HardCodedConfiguration : IConfiguration
    {
        public string SendGridKey => "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";
        public string UrlOrigin => "https://prospectscout.azurewebsites.net";
    }
}
