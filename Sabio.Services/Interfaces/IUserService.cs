namespace Sabio.Services
{
    public interface IUserService
    {
        int Create(object userModel);
        bool LogIn(string email, string password);
        bool LogInTest(string email, string password, int id, string[] roles = null);
    }
}