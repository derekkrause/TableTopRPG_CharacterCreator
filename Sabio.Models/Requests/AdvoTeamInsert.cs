using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
   public class AdvoTeamInsert
    {
        [Required]
        public int? AdvocateUserId { get; set; }
        [Required]
        public int? TeamId { get; set; }
   
    }
}
