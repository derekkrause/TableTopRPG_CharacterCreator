using System.ComponentModel.DataAnnotations;

namespace Sabio.Models
{
    public class UserCreateRequest
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string MiddleName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required, MaxLength(1)]
        public int Gender { get; set; }

        [Required, MaxLength(250)]
        public string AvatarUrl { get; set; }

        [Required, MaxLength(100)]
        public string Email { get; set; }

        [Required, MaxLength(100)]
        public string PasswordHash { get; set; }
    }
}
