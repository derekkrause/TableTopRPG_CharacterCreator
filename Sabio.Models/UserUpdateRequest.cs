using System.ComponentModel.DataAnnotations;

namespace Sabio.Models
{
    public class UserUpdateRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
