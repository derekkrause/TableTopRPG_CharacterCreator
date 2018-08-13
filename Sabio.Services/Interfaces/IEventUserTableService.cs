using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IEventUserTableService
    {
        int Create(EventUserTableCreateRequest request);
        List<EventUserTable> GetAll();
        List<EventUserTable> GetByEventId(int id);
        void DeleteByEventIdUserId(int eventId, int userId);
        List<EventUserAttendee> GetByEventIdWithAttendees(int id);
    }
}
