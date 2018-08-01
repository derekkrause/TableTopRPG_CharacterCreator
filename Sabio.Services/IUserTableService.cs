using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;

namespace Sabio.Services
{
    public interface IUserTableService
    {
        PagedItemResponse<User> GetAll(int pageIndex, int pageSize);
        User GetById(int id);
        int Create(UserCreateRequest request);
        int Login(UserLoginRequest request);
        void Update(UserUpdateRequest request);
        void Delete(int id);
    }
}
