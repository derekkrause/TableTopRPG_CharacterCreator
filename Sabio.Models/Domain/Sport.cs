using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Sport
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int DisplayOrder { get; set; }
        public bool Inactive { get; set; }
        public string Gender { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
