using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class UserConfirmRequest
    {
        [Required]
        public string TokenId { get; set; }
        
    }
}
