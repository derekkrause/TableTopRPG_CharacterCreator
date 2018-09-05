using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class CoachSearch
    {
    public string TableName { get; set; }
    public int Rank { get; set; }
    public JRaw ItemData { get; set; }
    }
}
