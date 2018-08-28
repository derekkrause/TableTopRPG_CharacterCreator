using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserCreateRequest
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required, MaxLength(100)]
        public string Email { get; set; }

        [Required, MaxLength(100)]
        public string PasswordHash { get; set; }

        public int? CurrentSportId { get; set; }
    }
}
