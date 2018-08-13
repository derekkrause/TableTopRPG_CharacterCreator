using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;

namespace Sabio.Services
{
    public interface IUserTableService
    {
        int Create(UserCreateRequest request);
        PagedItemResponse<User> GetAll(int pageIndex, int pageSize);
        User GetById(int id);
        UserBase Login(UserLoginRequest request);
        void Update(UserUpdateRequest request);
        void Delete(int id);
    }
}
