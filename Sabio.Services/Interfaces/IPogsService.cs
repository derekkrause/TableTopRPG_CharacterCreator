using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;

namespace Sabio.Services.Interfaces
{
    public interface IPogsService
    {
        // all methods/properties in an interface are implicitly
        // considered "public"
        PagedItemResponse<Pog> GetAll(int pageIndex, int pageSize);
        Pog GetById(int id);
        int Insert(PogCreateRequest request);
        void Update(PogUpdateRequest request);
        void Delete(int id);


    }
}
