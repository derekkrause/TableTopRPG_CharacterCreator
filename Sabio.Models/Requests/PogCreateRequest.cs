using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class PogCreateRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime? StartDate { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public int? Points { get; set; }
        [Required]
        public bool? Inactive { get; set; }
        [Required]
        public string Url { get; set; }
    }
}
