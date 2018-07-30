using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IEventTypeService
    {
        int Create(EventTypeCreateRequest request);
        List<EventType> GetAll();
        EventType GetById(int id);
        void Update(EventTypeUpdateRequest request);
        void Delete(int id);
        List<EventType> SearchAll(string searchTerms);
    }
}
