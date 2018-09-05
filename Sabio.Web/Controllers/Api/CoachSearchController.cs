using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/coachsearch")]
    public class CoachSearchController: ApiController
    {
        readonly CoachSearchService coachSearchService;

        public CoachSearchController(CoachSearchService coachSearchService)
        {
            this.coachSearchService = coachSearchService;
        }
        
        [Route("{pageIndex:int}/{pageSize:int}"),HttpGet]
        public HttpResponseMessage Search(int pageIndex, int pageSize, string q ="")
        {
            PagedItemResponse<CoachSearch> pagedItemResponse = coachSearchService.Search(pageIndex, pageSize, q);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<CoachSearch>>
            {
                Item = pagedItemResponse
            });
        }
    }
}