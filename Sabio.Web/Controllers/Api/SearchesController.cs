using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/search")]
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
            searchesService.Search(q);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}


