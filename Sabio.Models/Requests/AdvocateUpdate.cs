using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AdvocateUpdate : UserCreateRequest
    {   
        [Required]
        public int? Id { get; set; }
        [Required]
        public int? UserId { get; set; }
        public int? HighSchoolId { get; set; }
        [MaxLength(250)]
        public string Title { get; set; }
        [MaxLength(500)]
        public string ShortBio { get; set; }
        public string Name { get; set; }
        
    }
}
