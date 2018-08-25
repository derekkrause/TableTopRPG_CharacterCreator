using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class AthleteSportCreateRequest
    {
            [Required]
            public int UserId { get; set; }

            [Required]
            public int SportId { get; set; }

            [Required]
            public int ClassYearId { get; set; }

            [Required]
            public JRaw SportPositionId { get; set; }
            
            [Required]
            public int SelectedSchoolClubOrTeam { get; set; }

            public int SportLevelId { get; set; }

            public string Comments { get; set; }

            public int? SchoolId { get; set; }

            public string ClubName { get; set; }
        
            public string TeamName { get; set; }
    }
}