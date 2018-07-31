using Sabio.Models.Domain;
using Sabio.Service;
using Sabio.Services;
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
        readonly IAuthenticationService authService;

        public ExampleController(IAuthenticationService authService)
        {
            this.authService = authService;
        }

        [Route("api/test/dotnet"), HttpGet, AllowAnonymous]
        public object Test()
        {
            return new { Message = "Hello from .NET!" };
        }

        [Route("api/test/login"), HttpPost, AllowAnonymous]
        public HttpResponseMessage Login() // TODO: remove this before delivery to the client
        {
            authService.LogIn(new UserBase
            {
                Id = 123,
                Name = "Test",
                Roles = new[] { "role1", "role2" }
            });

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
