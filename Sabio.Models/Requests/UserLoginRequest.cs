using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserLoginRequest
    {
        [Required, MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}
