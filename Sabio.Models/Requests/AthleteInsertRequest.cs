using System.ComponentModel.DataAnnotations;

namespace Sabio.Models
{
    public class AthleteInsertRequest
    {

        [Required]
        public int User { get; set; }

        [Required]
        public int DOB { get; set; }

        [Required]
        public string BirthPlace { get; set; }

        [Required]
        public int SchoolId { get; set; }

        [Required]
        public int SportLevelId { get; set; }

        public int ClassYearId { get; set; }

        public int HighSchoolGraduationYear { get; set; }

        public string ShortBio { get; set; }

        public string ResidencyState { get; set; }
    }
}
