using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class BlogCreateRequest
    {
        [Required, MaxLength(100)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required, MaxLength(450)]
        public string Slug { get; set; }

        [MaxLength(250)]
        public string ImageUrl { get; set; }

    }
}
