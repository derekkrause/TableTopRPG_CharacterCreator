using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/advocate/advoathlete")]
    public class AdvoAthleteController : ApiController
    {
        readonly AdvoAthleteService advoAthleteService;

        public AdvoAthleteController(AdvoAthleteService advoAthleteService)
        {
            this.advoAthleteService = advoAthleteService;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAllAdvoAthletesById()
        {
            int advoAthleteId = User.Identity.GetId().Value;
            PagedItemResponse<AdvoAthlete> pagedItemResponse = advoAthleteService.GetAllAdvoAthletesById(advoAthleteId);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<AdvoAthlete>>
            {
                Item = pagedItemResponse
            });
        }

        [Route, HttpPost]
        public HttpResponseMessage InsertAdvoAthlete(AdvoAthleteInsert advoAthleteInsert)
        {
            if (advoAthleteInsert == null)
            {
                ModelState.AddModelError("", "Data is Null");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int advoAthleteId = advoAthleteService.AdvoAthleteInsert(advoAthleteInsert);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int>
            {
                Item = advoAthleteId
            });
        }

        [Route("{advoAthleteId:int}"), HttpPut]
        public HttpResponseMessage UpdateAdvoAthlete(AdvoAthleteUpdate advoAthleteUpdate, int advoAthleteId)
        {
            if (advoAthleteUpdate == null)
            {
                ModelState.AddModelError("", "Data is Null");
            }

            if (advoAthleteUpdate.Id != advoAthleteId)
            {
                ModelState.AddModelError("Id", "Id does not match");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            advoAthleteService.AdvoAthleteUpdate(advoAthleteUpdate);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{advoAthleteId:int}"), HttpDelete]
        public HttpResponseMessage DeleteAdvoAthlete(int advoAthleteId)
        {

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            advoAthleteService.AdvoAthleteDelete(advoAthleteId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}