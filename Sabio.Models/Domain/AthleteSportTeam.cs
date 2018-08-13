using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class AthleteSportTeam
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SportId { get; set; }
        public string SportName {get;set;}
        public string SchoolName { get; set; }
        public string ClassYear { get; set; }
        public string SportLevel { get; set; }
        public int ClassYearId { get; set; }
        public List<SportPositionBasic> SportPositionIds { get; } = new List<SportPositionBasic>();
        public int SelectedSchoolClubOrTeam { get; set; }
        public int SportLevelId { get; set; }
        public string Comments { get; set; }
        public int? SchoolNameId { get; set; }
        public string ClubName { get; set; }
        public string TeamName { get; set; }
    }
}
