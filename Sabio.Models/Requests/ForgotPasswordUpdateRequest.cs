using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class ForgotPasswordUpdateRequest : UserLoginRequest
    {
        [Required]
        public string TokenId { get; set; }

        [Required]
        public bool Confirmed { get; set; }
    }
}
