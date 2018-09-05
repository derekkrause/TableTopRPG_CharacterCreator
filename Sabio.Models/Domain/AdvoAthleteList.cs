using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AdvoAthleteList
    {
        public int AthleteUserId { get; set; }
        public int AdvocateUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public bool Verify { get; set; }
    }
}
