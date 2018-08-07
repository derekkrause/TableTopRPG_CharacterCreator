using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System.Collections.Generic;

namespace Sabio.Services
{
    public class FakePogService : IPogsService
    {
        public int Create(PogCreateRequest request)
        {
            return 42;
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
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

        public Pog GetById(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(PogCreateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public void Update(PogUpdateRequest request)
        {
            throw new System.NotImplementedException();
        }
    }
}
