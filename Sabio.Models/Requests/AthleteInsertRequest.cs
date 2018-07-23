using System.ComponentModel.DataAnnotations;

namespace Sabio.Models
{
    public class AthleteInsertRequest
    {

        [Required]
        public int UserId { get; set; }

        [Required]
        public string DOB { get; set; }

        [Required]
        public string BirthPlace { get; set; }

        [Required]
        public int SchoolId { get; set; }

        public int? ClassYearId { get; set; }

        public int? HighSchoolGraduationYear { get; set; }

        public string ShortBio { get; set; }

        public string ResidencyState { get; set; }
    }
}
