using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/athletetrend")]
    public class AthleteTrendController:ApiController
    {
        readonly AthleteTrendService athleteTrendService;
        
        public AthleteTrendController(AthleteTrendService athleteTrendService)
        {
            this.athleteTrendService = athleteTrendService;
        }

        [Route,HttpGet]
        public HttpResponseMessage GetAll(string q)
        {
            PagedItemResponse<AthleteTrend> pagedItemResponse = athleteTrendService.GetAll(q);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<AthleteTrend>>
            {
                Item = pagedItemResponse
            });
        }
    }
}