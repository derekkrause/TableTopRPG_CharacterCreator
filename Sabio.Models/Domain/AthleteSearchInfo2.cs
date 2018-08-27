using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AthleteSearchInfo2
    { 
        public int? UserId { get; set; }
        public int? AthleteId { get; set; }
        public string ShortBio { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ClassYear { get; set; }
        public JRaw sportInfo { get; set; }
        public int? HighSchoolGraduationYear { get; set; }
        public string School { get; set; }
    }
}
