using Newtonsoft.Json.Linq;
using System;

namespace Sabio.Models.Domain
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int AuthorId { get; set; }
        public JRaw ImageUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public JRaw VideoUrl { get; set; }
        public JRaw SportInfo { get; set; }
        public bool Liked { get; set; }
        public int? LikeCount { get; set; }
        public int? LikedId { get; set; }
        public JRaw CommentData { get; set; }
    }
}
