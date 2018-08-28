using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class CoachUpdateRequest
    {
        [Required]
        public int UserId { get; set; }
        [Required, MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string MiddleName { get; set; }
        [Required, MaxLength(50)]
        public string LastName { get; set; }
        [MaxLength(250)]
        public string AvatarUrl { get; set; }
        [Required, MaxLength(50)]
        public string City { get; set; }
        [Required, MaxLength(50)]
        public string State { get; set; }
        [Required, MaxLength(250)]
        public string Title { get; set; }
        [MaxLength(500)]
        public string Bio { get; set; }
        [Required]
        public string SchoolName { get; set; }
    }
}
