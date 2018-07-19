﻿using System;

namespace Sabio.Data.Models
{
    class Athlete
    {
        public int Id { get; set; }
        public int User { get; set; }
        public int DOB { get; set; }
        public string BirthPlace { get; set; }
        public int SchoolId { get; set; }
        public int SportLevelId { get; set; }
        public int? ClassYearId { get; set; }
        public int HighSchoolGraduationYear { get; set; }
        public string ShortBio { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string ResidencyState { get; set; }
    }
}
