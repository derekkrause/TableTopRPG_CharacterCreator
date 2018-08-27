using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/coach")]
    public class CoachProfileController : ApiController
    {
        readonly IAuthenticationService authenticationService;
        readonly CoachProfileService coachProfileService;

        public CoachProfileController(IAuthenticationService authenticationService, CoachProfileService coachProfileService)
        {
            this.authenticationService = authenticationService;
            this.coachProfileService = coachProfileService;
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetByUserId(int id)
        {
            ItemResponse<CoachProfile> itemResponse = new ItemResponse<CoachProfile> { Item = coachProfileService.GetByUserId(id) };
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }
    }
}