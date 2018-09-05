using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Team
    {
        public int? Id { get; set; }
        public int? SportId { get; set; }
        public int? SportLevelId { get; set; }
        public int? SchoolId { get; set; }
        public int? UserId { get; set; }
        public string Name { get; set; }
        public string SchoolName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int? Zip { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

    }
}
