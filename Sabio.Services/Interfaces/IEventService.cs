using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IEventService
    {
        int Create(EventCreateRequest request);
        void Update(EventUpdateRequest request);
        void Delete(int id);
        PagedItemResponse<Event> GetAllPaging(int pageIndex, int pageSize);
        Event GetById(int id);
        PagedItemResponse<Event> SearchAllPaging(int pageIndex, int pageSize, string searchTerms);
        List<Event> GetByUserId(int userId);
        List<Event> SearchAll(string searchTerms);
    }
}
