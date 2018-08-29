using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.ViewModels
{
   public class Advocate:Schools 
    {        
        //public int? Id { get; set; }      
        public int? UserId { get; set; }    
        public int? HighSchoolId { get; set; }
        public string Title { get; set; }      
        public string ShortBio { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int? Gender { get; set; }
        public string AvatarUrl { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool IsAthlete { get; set; }
        public bool IsCoach { get; set; }
        public bool IsAdvocate { get; set; }
        public DateTime DateCreated { get; set; }    
        public DateTime DateModified { get; set; }
     
      
    }
}
