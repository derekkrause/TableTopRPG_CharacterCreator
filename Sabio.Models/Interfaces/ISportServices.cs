using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Interfaces
{
    public interface ISportServices
    {
        List<Sport> GetAll();
        int Create(SportCreateRequest request);
        void Update(SportUpdateRequest request);
        Sport GetById(int id);
        void Delete(int Id);
    }
}
