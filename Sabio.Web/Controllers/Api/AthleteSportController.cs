using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/athleteTeam")]
    public class AthleteSportController : ApiController
    {
        readonly AthleteSportService athleteSportService;

        public AthleteSportController(AthleteSportService athleteSportService)
        {
            this.athleteSportService = athleteSportService;
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(AthleteSportCreateRequest athleteSportCreateRequest)
        {
            if (athleteSportCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            athleteSportService.Create(athleteSportCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new SuccessResponse());
        }

        [Route ("{id:int}"), HttpPut]
        public HttpResponseMessage Update(AthleteSportUpdateRequest athleteSportUpdateRequest, int id)
        {
            if (athleteSportUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            athleteSportService.Update(athleteSportUpdateRequest, id);

            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }

        [Route("{userId:int}"), HttpGet]
        public HttpResponseMessage GetAllByUserId(int userId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            ItemsResponse<AthleteSportTeam> itemsResponse = athleteSportService.GetAllByUserId(userId);

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }
        [Route("{athleteTeamId:int}"), HttpDelete]
        public HttpResponseMessage Delete(int athleteTeamId)
        {
            athleteSportService.Delete(athleteTeamId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}