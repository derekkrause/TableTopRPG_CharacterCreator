using System;

namespace Sabio.Models.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int Gender { get; set; }
        public string AvatarUrl { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get;  set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
