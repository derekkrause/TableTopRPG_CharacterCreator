using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Data.Models
{
    public class BlogBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string Slug { get; set; }
        public string AuthorId { get; set; }
        public DateTime PublishDate { get; set; }
        public bool IsPublished { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
