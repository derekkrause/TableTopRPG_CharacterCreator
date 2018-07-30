using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class EventCreateRequest
    {
        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(20)]
        public string ShortName { get; set; }

        [Required]
        public int EventTypeId { get; set; }

        public DateTime? StartDate { get; set; }

        [Required]
        public int AddressId { get; set; }

        public DateTime? EndDate { get; set; }

        public string Description { get; set; }

        public string WebsiteUrl { get; set; }

        public string Logo { get; set; }

        [Required]
        public bool IsOngoing { get; set; }

        public string Organizer { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        [Required]
        public int ModifiedBy { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string Suite { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Zip { get; set; }

        public double? Lat { get; set; }

        public double? Long { get; set; }
    }
}
