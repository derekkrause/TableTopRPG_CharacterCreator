using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AllSearch
    {
        public int IdInTable { get; set; }
        public int RelevanceRanking { get; set; }
        public string TableName { get; set; }
        public string Type { get; set; }
        public JRaw ItemData { get; set; }
    }
}
