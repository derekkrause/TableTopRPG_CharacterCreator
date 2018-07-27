using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
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
        [Route, HttpPost]
        public HttpResponseMessage Insert(AthleteInsertRequest athleteInsertRequest)
        {
            if (athleteInsertRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int id = athletesService.Insert(athleteInsertRequest);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int> { Item = id });
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