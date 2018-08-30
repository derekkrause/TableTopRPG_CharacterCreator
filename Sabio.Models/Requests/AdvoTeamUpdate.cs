﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
   public class AdvoTeamUpdate:AdvoTeamInsert
    {
        [Required]
        public int Id { get; set; }
        public int? CollegeId { get; set; }
        public int? HighSchoolId { get; set; }
        public string Title { get; set; }
        public string ShortBio { get; set; }
    }
}