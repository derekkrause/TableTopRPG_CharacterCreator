using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.ViewModels
{
    public class Advocate
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public int? CollegeId { get; set;}
        public int? HighSchoolId { get; set; }
        public string Title { get; set; }      
        public string ShortBio { get; set; }    
        public DateTime DateCreated { get; set; }    
        public DateTime DateModified { get; set; }
    }
}
