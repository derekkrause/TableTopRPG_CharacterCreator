using Sabio.Models.Domain;
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
    [RoutePrefix("api/allsearch")]
    public class AllSearchController : ApiController
    {
        readonly AllSearchService allSearchService;

        public AllSearchController(AllSearchService allSearchService)
        {
            this.allSearchService = allSearchService;
        }

        [Route, HttpGet]
        public HttpResponseMessage AllSearch(string q)
        {
            List<AllSearch> allSearches = allSearchService.GetAllSearches(q);

            ItemsResponse<AllSearch> items = new ItemsResponse<AllSearch>
            {
                Items = allSearches
            };

            return Request.CreateResponse(HttpStatusCode.OK, items);
        }

        [Route("paged/{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage AllSearchPaged(int pageIndex, int pageSize, string q)
        {
            PagedItemResponse<AllSearch> pagedItemResponse = allSearchService.GetAllSearchPaged(pageIndex, pageSize, q);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<AllSearch>>
            {
                Item = pagedItemResponse
            });
        }
    }
}