using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;

namespace Sabio.Services
{
    public interface IPogsService
    {
        // all methods/properties in an interface are implicitly
        // considered "public"
        PagedItemResponse<Pog> GetAll(int pageIndex, int pageSize);
        int Create(PogCreateRequest request);
    }
}
