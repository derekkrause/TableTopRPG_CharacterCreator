using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
   public class AthleteFilterOptions
    {
        public List<DropDownClassYear> ClassYear { get; } = new List<DropDownClassYear>();
        public List<DropDownSportPosition> SportPosition { get; } = new List<DropDownSportPosition>();
        public List<State> State { get; } = new List<State>();
    }
}
