using Sabio.Models.Domain;
using Sabio.Models.Interfaces;
using Sabio.Models.Requests;
using Sabio.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;


namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/sports")]
    public class SportController : ApiController
    {
        readonly ISportServices SportService;

        public SportController(ISportServices sportService)
        {
            this.SportService = sportService;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<Sport> sport = SportService.GetAll();

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

            int newSportId = SportService.Create(sportCreateRequest);

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
            SportService.Update(sportUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            SportService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            Sport sport = SportService.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, sport);
        }
    }
}