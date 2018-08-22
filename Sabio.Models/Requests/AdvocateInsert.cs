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
        public int UserId { get; set; }
    }
}
