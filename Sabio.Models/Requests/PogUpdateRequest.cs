using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class PogUpdateRequest : PogCreateRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
