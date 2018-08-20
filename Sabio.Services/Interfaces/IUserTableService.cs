using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using SendGrid;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserTableService
    {
        Task<Response> Create(UserCreateRequest request);
        Task<Response> Resend(UserResendRequest request);
        PagedItemResponse<User> GetAll(int pageIndex, int pageSize);
        User GetById(int id);
        UserBase Login(UserLoginRequest request);
        void Update(UserUpdateRequest request);
        void Delete(int id);
        void Confirm(UserConfirmRequest request);
    }
}
