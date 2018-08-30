using Sabio.Models;
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
    [RoutePrefix("api/athletes")]
    public class AthletesController : ApiController
    {
        readonly AthletesService athletesService;

        public AthletesController(AthletesService athletesService)
        {
            this.athletesService = athletesService;
        }
        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage GetAll(int pageIndex, int pageSize)
        {
            PagedItemResponse<Athlete> pagedItemResponse = athletesService.GetAll(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Athlete>>
            {
                Item = pagedItemResponse
            });

        }
        [Route, HttpPost, AllowAnonymous]
        public HttpResponseMessage Insert(AthleteInsertRequest request)
        {
            if (request.UserId == 0)
            {
                ModelState.AddModelError("", "Missing userId");
            }

            int response = athletesService.Insert(request.UserId);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("{userId:int}"), HttpGet]
        public HttpResponseMessage GetById(int userId)
        {
            Athlete pagedItemResponse = athletesService.GetById(userId);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Athlete>
            {
                Item = pagedItemResponse
            });

        }
        [Route("{userId:int}"), HttpDelete]
        public HttpResponseMessage Delete(int userId)
        {
            athletesService.Delete(userId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [Route("{userId:int}"), HttpPut]
        public HttpResponseMessage Update(AthleteUpdateRequest athleteUpdateRequest, int userId)
        {
            int? currentUserId = User.Identity.GetId();

            if (userId != currentUserId)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User not authorized to make changes to this profile.");
            }

            if (athleteUpdateRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            else if (athleteUpdateRequest.Id != userId)
            {
                ModelState.AddModelError("id", "ID in URL does not match ID in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            athletesService.Update(athleteUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}