using Newtonsoft.Json.Linq;
using System;


namespace Sabio.Models.Domain
{
    public class AthleteTrend
    {
        public int UserId { get; set; }
        public int AthleteId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Sport { get; set; }
        public JRaw SportPosition { get; set; }
    }
}
