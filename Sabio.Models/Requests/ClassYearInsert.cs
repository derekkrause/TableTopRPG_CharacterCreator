using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class ClassYearInsert
    {
        [Required, MaxLength(20)]
        public string Code { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; }
        [Required]
        public int? DisplayOrder { get; set; }
        [Required]
        public bool? Inactive { get; set; }

    }
}
