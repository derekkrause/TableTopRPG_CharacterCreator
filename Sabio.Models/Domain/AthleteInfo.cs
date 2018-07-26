using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AthleteInfo
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime DOB { get; set; }
        public int? ClassYearId { get; set; }
        public int? HighSchoolGraduationYear { get; set; }
    }
}
