﻿using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class SportCreateRequest
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int? DisplayOrder { get; set; }
        [Required]
        public bool? Inactive { get; set; }
        [Required]
        public char Gender { get; set; }

        public List<SportPosition> Positions { get; set; }
    }
}
