using System;

namespace Sabio.Models.Domain
{
    public class Notifications
    {
        public int CurrentUserId { get; set; }
        public int NotificationId { get; set; }
        public int PostId { get; set; }
        public int OtherUserId { get; set; }
        public DateTime DateCreated { get; set; }
        public string fullname { get; set; }
        public bool usernotified { get; set; }
        public string AvatarUrl { get; set; }
        public string NotificationType { get; set; }
    }
}
