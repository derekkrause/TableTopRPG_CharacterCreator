using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    public class ExampleController : ApiController
    {
        [Route("api/test/dotnet"), HttpGet, AllowAnonymous]
        public object Test()
        {
            return new { Message = "Hello from .NET!" };
        }
    }
}
