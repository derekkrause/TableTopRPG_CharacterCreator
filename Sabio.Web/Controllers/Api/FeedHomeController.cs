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
    [RoutePrefix("api/feedhome")]
    public class FeedHomeController:ApiController
    {
        readonly FeedHomeService feedHomeService;
        public FeedHomeController(FeedHomeService feedHomeService)
        {
            this.feedHomeService = feedHomeService;
        }

        [Route("{pageIndex:int?}/{pageSize:int?}"),HttpGet]
        public HttpResponseMessage GetAll(int pageIndex = 0, int pageSize = 20)
        {
            PagedItemResponse<FeedHome> pagedItemResponse = feedHomeService.GetAll(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<FeedHome>>
            {
                Item = pagedItemResponse
            });
        }
    }
}