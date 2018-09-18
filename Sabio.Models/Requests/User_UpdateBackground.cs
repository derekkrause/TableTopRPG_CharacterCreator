using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class User_UpdateBackground
    {
        public int? Id { get; set; }
        public string BackgroundUrl { get; set; }
    }
}
