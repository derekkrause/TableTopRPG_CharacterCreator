using System.ComponentModel.DataAnnotations;

namespace Sabio.Models
{
    public class AthleteInsertRequest
    {
        
        public int UserId { get; set; }

        public string DOB { get; set; }
        
        public string BirthPlace { get; set; }
        
        public int? SchoolId { get; set; }

        public int? ClassYearId { get; set; }

        public int? HighSchoolGraduationYear { get; set; }

        public string ShortBio { get; set; }

        public string ResidencyState { get; set; }
    }
}
