using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class CoachInsertRequest
    {
        [Required]
        public int UserId { get; set; }
    }
}
