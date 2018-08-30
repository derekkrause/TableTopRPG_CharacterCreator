
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/schoolsearch")]
    public class SchoolSearchController: ApiController
    {
        readonly SchoolSearchService schoolSearchService;

        public SchoolSearchController(SchoolSearchService schoolSearchService)
        {
            this.schoolSearchService = schoolSearchService;
        }

        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage Search(int pageIndex , int pageSize, string q ="", double? lat = null, double? lon =null, double? radius=null)
        {
            PagedItemResponse<SchoolSearch> pagedItemResponse = schoolSearchService.Search(pageIndex, pageSize, q,lat,lon,radius);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<SchoolSearch>>
            {
                Item = pagedItemResponse
            }
                );
                 
        }
    }
}