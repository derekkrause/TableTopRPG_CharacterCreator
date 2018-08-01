using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/sports")]
    public class SportsController : ApiController
    {
        readonly ISportServices sportService;

        public SportsController(ISportServices sportService)
        {
            this.sportService = sportService;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<Sport> sport = sportService.GetAll();

            return Request.CreateResponse(HttpStatusCode.OK, sport);
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(SportCreateRequest sportCreateRequest)
        {
            if (sportCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newSportId = sportService.Create(sportCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, newSportId);
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(SportUpdateRequest sportUpdateRequest, int id)
        {
            if (sportUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            else if (sportUpdateRequest.Id != id)
            {
                ModelState.AddModelError("id", "Id in body doesn't match URL");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            sportService.Update(sportUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            sportService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            Sport sport = sportService.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, sport);
        }
    }
}