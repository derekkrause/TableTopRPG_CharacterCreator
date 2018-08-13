using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class SportUpdateRequest : SportRequestBase
    {
        [Required]
        public int? Id { get; set; }

        [Required]
        public JRaw Positions { get; set; }
    }
}
