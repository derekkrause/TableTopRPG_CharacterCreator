using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models
{
    public class AdvocateInsert
    {   
        [Required]
        public int? UserId { get; set; }
        public int? CollegeId { get; set; }
        public int? HighSchoolId { get; set; }
        [Required, MaxLength(250)]
        public string Title { get; set; }
        [Required, MaxLength(500)]
        public string ShortBio { get; set; }
   
    }
}
