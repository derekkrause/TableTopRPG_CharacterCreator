using Sabio.Models.Domain;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IAllSearchService
    {
        List<AllSearch> GetAllSearches(string query);
        PagedItemResponse<AllSearch> GetAllSearchPaged(int pageIndex, int pageSize, string query);
    }
}
