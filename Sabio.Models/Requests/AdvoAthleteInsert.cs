using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class AdvoAthleteInsert
    {
        [Required]
        public int? AdvocateUserId { get; set; }
        [Required]
        public int? AthleteUserId { get; set; }
        [MaxLength(500)]
        public string Notes { get; set; } 

    }
}
