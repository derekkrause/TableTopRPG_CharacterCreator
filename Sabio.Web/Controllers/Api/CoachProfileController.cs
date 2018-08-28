using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Security;
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

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage UpdateCoachProfile(CoachUpdateRequest request, int id)
        {
            int? currentUserId = User.Identity.GetId();

            if (id != currentUserId)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User not authorized to make changes to this profile.");
            }

            if (request == null)
            {
                ModelState.AddModelError("", "Missing Parameters");
            }
            else if (request.UserId != id)
            {
                ModelState.AddModelError("id", "Id in URL does not match Id in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            ItemResponse<CoachProfile> itemResponse = new ItemResponse<CoachProfile> { Item = coachProfileService.UpdateCoachProfile(request) };
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }
    }
}