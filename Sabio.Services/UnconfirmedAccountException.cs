using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UnconfirmedAccountException : ApplicationException
    {
        public UnconfirmedAccountException() : base() { }
    }
}
