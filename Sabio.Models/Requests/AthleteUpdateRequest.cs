using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class AthleteUpdateRequest : AthleteInsertRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
