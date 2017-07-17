using Sabio.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web;
using System.Web.Http;
using Sabio.Services.Security;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/tests/auth")]
    public class TestAuthController : ApiController
    {
        private IUserService _userService;
        private IAuthenticationService _auth;
        private IPrincipal _principal;

        public TestAuthController(IUserService userService, IAuthenticationService auth, IPrincipal principal)
        {
            _userService = userService;
            _auth = auth;
            _principal = principal;
        }

        [Route("login"), HttpGet]
        public HttpResponseMessage LogIn()
        {
            _userService.LogInTest("gregorio@sabio.la", "Sabiopass1!");

            return Request.CreateResponse(HttpStatusCode.OK, "Ok");
        }

        [Route("logout"), HttpGet]
        public HttpResponseMessage Logout()
        {
            _auth.LogOut();

            return Request.CreateResponse(HttpStatusCode.OK, new Object());
        }


        [Route("current"), HttpGet]
        public HttpResponseMessage Current()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _principal.Identity.GetCurrentUser());
        }

        [Route("current/Authorized"), HttpGet][Authorize]
        public HttpResponseMessage CurrentAuth()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _principal.Identity.GetCurrentUser());
        }

        [Route("current/roles/manager"), HttpGet]
        [Authorize(Roles="Content Manager")]
        public HttpResponseMessage CurrentAuthManager()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _principal.Identity.GetCurrentUser());
        }

        [Route("current/roles/super"), HttpGet]
        [Authorize(Roles = "Super")]
        public HttpResponseMessage Super()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _principal.Identity.GetCurrentUser());
        }

        [Route("current/roles/RoleFive"), HttpGet]
        [Authorize(Roles = "RoleFive")]
        public HttpResponseMessage RoleFive()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _auth.GetCurrentUser());
        }
    }
}
