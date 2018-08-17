namespace Sabio.Services.Interfaces
{
    // Please modify this file if you want to add more configuration values
    public interface IConfiguration
    {
        string SendGridKey { get; }
        string UrlOrigin { get; }
    }
}
