using Sabio.Models.Domain;
using Sabio.Models.Responses;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ISchoolSearchService
    {
        PagedItemResponse<SchoolSearch> Search(int pageIndex, int pageSize, string q="", double? Lat = null, double? Lon=null, double? radius=null);
    }
}
