using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserResendRequest
    {
        [Required]
        public string Email { get; set; }
    }
}
