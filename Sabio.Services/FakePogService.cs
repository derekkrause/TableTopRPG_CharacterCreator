using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;

namespace Sabio.Services
{
    public class FakePogService : IPogsService
    {
        public int Create(PogCreateRequest request)
        {
            return 42;
        }

        public PagedItemResponse<Pog> GetAll(int pageIndex, int pageSize)
        {
            return new PagedItemResponse<Pog>
            {
                HasNextPage = false,
                HasPrevPage = false,
                PagedItems = new List<Pog>(),
                PageIndex = pageIndex,
                PageSize = pageSize,
                TotalCount = 0,
                TotalPages = 0
            };
        }
    }
}
