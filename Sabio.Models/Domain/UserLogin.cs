﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class UserLogin
    {
        public int UserId { get; set; }
        public string[] UserRoles { get; set; }
    }
}
