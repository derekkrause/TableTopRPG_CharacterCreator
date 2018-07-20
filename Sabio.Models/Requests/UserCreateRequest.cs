using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserCreateRequest
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public int Gender { get; set; }

        [MaxLength(250)]
        public string AvatarUrl { get; set; }

        [Required, MaxLength(100)]
        public string Email { get; set; }

        [Required, MaxLength(100)]
        public string PasswordHash { get; set; }
    }
}
