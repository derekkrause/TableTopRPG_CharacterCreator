using System;
using System.Collections.Generic;

namespace Sabio.Models.Domain
{
    public class Sport
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? DisplayOrder { get; set; }
        public bool? Inactive { get; set; }
        public string Gender { get; set; }
        public List <SportPosition> Positions { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

