using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
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
    [RoutePrefix("api/athletesport")]
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
        [Route("{pageIndex:int}/{pageSize:int}/{userId:int}"), HttpGet]
        public HttpResponseMessage GetAllByUserId(int pageIndex, int pageSize, int userId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            PagedItemResponse<AthleteSportTeam> pagedItemResponse = athleteSportService.GetAllByUserId(pageIndex, pageSize, userId);

            return Request.CreateResponse(HttpStatusCode.OK, pagedItemResponse);
        }
    }
}