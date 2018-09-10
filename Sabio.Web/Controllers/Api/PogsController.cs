using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/pogs")]
    public class PogsController : ApiController
    {
        readonly IPogsService pogsService;

        public PogsController(IPogsService pogsService)
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

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            Pog pog = pogsService.GetById(id);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Pog>
            {
                Item = pog
            });
        }

        [Route, HttpPost]
        public HttpResponseMessage Post(PogCreateRequest pogCreateRequest)
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

            int newPogId = pogsService.Insert(pogCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newPogId });
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(int id, PogUpdateRequest pogUpdateRequest)
        {
            if (pogUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            pogsService.Update(pogUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            pogsService.Delete(id);

            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }
    }
}