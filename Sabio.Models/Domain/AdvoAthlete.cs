using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
   public class AdvoAthlete:User
    {
        //public int? Id  {get; set;} 
        public int? AdvocateUserId { get; set; } 
        public int? AthleteUserId { get; set; }
        public string Notes { get; set; }
        //public DateTime DateCreated { get; set; }
        //public DateTime DateModified { get; set; } 
    }
}
