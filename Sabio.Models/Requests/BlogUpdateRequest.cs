using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class BlogUpdateRequest : BlogCreateRequest
    {
        [Required]
        public int? Id { get; set; }

    }
}
