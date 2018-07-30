using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class EventTypeCreateRequest
    {
        [Required, MaxLength(20)]
        public string Code { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        public int? DisplayOrder { get; set; }

        [Required]
        public bool Inactive { get; set; }

        public DateTime? DateCreated { get; set; }

        public DateTime? DateModified { get; set; }
    }
}
