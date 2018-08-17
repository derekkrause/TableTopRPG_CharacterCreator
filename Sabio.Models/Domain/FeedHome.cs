using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class FeedHome
    {
        public DateTime DateCreated { get; set; }
        public string Type { get; set; }
        public JRaw ItemData { get; set; }
    }
}
