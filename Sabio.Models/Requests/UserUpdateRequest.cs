using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserUpdateRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
