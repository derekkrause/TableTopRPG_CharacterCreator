using Sabio.Models.Domain;
using Sabio.Models.Requests;
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
    [RoutePrefix("api/pogs")]
    public class PogsController : ApiController
    {
        readonly PogsService pogsService;

        public PogsController(PogsService pogsService)
        {
            this.pogsService = pogsService;
        }

        [Route("{pageSize:int}/{pageIndex:int}"), HttpGet]
        public HttpResponseMessage GetAll(int pageSize, int pageIndex)
        {
            PagedItemResponse<Pog> pagedItemResponse = pogsService.GetAll(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Pog>>
            {
                Item = pagedItemResponse
            });
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(PogCreateRequest pogCreateRequest)
        {
            if (pogCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            // if we get here, the model is good

            int newPogId = pogsService.Create(pogCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newPogId });
        }
    }
}