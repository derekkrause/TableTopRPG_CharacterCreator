using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserUpdateRequest : UserCreateRequest
    {
        [Required]
        public int? Id { get; set; }

        public int? Gender { get; set; }

        public string AvatarUrl { get; set; }
    }
}
