using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class EmailConfirmation
    {
        public int Id { get; set; }
        public string RegEmail { get; set; }
        public string TokenId { get; set; }
        public int TokenTypeId { get; set; }
        public bool Confirmed { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
