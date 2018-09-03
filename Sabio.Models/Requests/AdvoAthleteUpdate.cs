﻿using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AdvoAthleteUpdate : AdvoAthleteInsert
    {
        [Required]
        public int? Id { get; set; }
        public bool Verify { get; set; }

    }
}
