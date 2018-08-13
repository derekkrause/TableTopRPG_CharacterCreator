using Sabio.Models.Domain;
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
    [RoutePrefix("api/search")]
    public class AthleteSearchController : ApiController
    {
       readonly AthleteSearchService athleteSearchService;

        public AthleteSearchController(AthleteSearchService athleteSearchService)
        {
            this.athleteSearchService = athleteSearchService;
        }
        [Route("athlete"), HttpGet]
        public HttpResponseMessage Search(string q, string classYear, string state, string school, string sportPosition)
        {
            List<AthleteSearchInfo> athleteSearchInfo = athleteSearchService.Search(q, classYear, state, school, sportPosition);
            return Request.CreateResponse(HttpStatusCode.OK, athleteSearchInfo);
        }
        [Route, HttpGet]
        public HttpResponseMessage GetAllOptions()
        {
            AthleteFilterOptions options = athleteSearchService.GetAllOptions();

            return Request.CreateResponse(HttpStatusCode.OK, options);
        }
    }
}