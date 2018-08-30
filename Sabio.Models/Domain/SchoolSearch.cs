using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class SchoolSearch
    {
        //public int Key { get; set; } 
        public int Rank { get; set; }
        public string TableName { get; set; }
        public int SchoolType { get; set; }
        public int SchoolId { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Url { get; set; }
        public JRaw ItemData { get; set; }
        public double? Lat { get; set; }
        public double? Lon { get; set; }
        public double? Distance { get; set; }
        public float? Radius { get; set; }


    }
}
