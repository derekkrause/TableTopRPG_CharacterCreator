using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class AthleteUpdateRequest : AthleteInsertRequest
    {
        [Required]
        public int? Id { get; set; }

        public string DOB { get; set; }

        public string BirthPlace { get; set; }

        public int? SchoolId { get; set; }

        public int? ClassYearId { get; set; }

        public int? HighSchoolGraduationYear { get; set; }

        public string ShortBio { get; set; }

        public string ResidencyState { get; set; }
    }
}
