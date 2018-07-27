using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class SportUpdateRequest : SportCreateRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
