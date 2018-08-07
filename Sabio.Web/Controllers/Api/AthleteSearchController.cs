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
        public HttpResponseMessage Search(string q)
        {
            List<AthleteSearchInfo> athleteSearchInfo = athleteSearchService.Search(q);
            return Request.CreateResponse(HttpStatusCode.OK, athleteSearchInfo);
        }




    }
}