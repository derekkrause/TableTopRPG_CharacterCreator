using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;

namespace Sabio.Services.Interfaces
{
    public interface IPogsService
    {
        void Delete(int id);
        PagedItemResponse<Pog> GetAll(int pageIndex, int pageSize);
        Pog GetById(int id);
        int Insert(PogCreateRequest request);
        void Update(PogUpdateRequest request);
    }
}