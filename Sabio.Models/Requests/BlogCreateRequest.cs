using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class BlogCreateRequest
    {
        [Required, MaxLength(100)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string Slug { get; set; }

        public JRaw ImageUrl { get; set; }


        public JRaw VideoUrl { get; set; }

    }
}
