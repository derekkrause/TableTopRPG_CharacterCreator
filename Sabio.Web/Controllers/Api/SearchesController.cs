using Sabio.Models.Domain;
using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/searches")]
    public class SearchesController : ApiController
    {
        readonly SearchesService searchesService;

        public SearchesController(SearchesService searchesService)
        {
            this.searchesService = searchesService;
        }
        [Route("athletes"), HttpGet]
        public HttpResponseMessage Search(string q)
        {
            AthleteInfo athleteInfo = searchesService.Search(q);
            return Request.CreateResponse(HttpStatusCode.OK, athleteInfo);
        }
    }
}


