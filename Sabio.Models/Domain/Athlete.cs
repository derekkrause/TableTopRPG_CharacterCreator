using System;

namespace Sabio.Data.Models
{
    public class Athlete
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime DOB { get; set; }
        public string BirthPlace { get; set; }
        public int SchoolId { get; set; }
        public int SportsLevelId { get; set; }
        public int? ClassYearId { get; set; }
        public int? HighSchoolGraduationYear { get; set; }
        public string ShortBio { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string ResidencyState { get; set; }
    }
}
