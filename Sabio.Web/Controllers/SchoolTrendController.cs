using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/schooltrend")]
    public class SchoolTrendController : ApiController
    {
        readonly ISchoolTrendService schoolTrendService;

        public SchoolTrendController(ISchoolTrendService schoolTrendService)
        {
            this.schoolTrendService = schoolTrendService;
        }
        
        [Route,HttpGet]
        public HttpResponseMessage GetAll()
        {
            PagedItemResponse<SchoolTrend> pagedItemResponse = schoolTrendService.GetAll();

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<SchoolTrend>>
            {
                Item = pagedItemResponse
            });
        }
    }
}