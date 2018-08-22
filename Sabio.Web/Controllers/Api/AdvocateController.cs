using Sabio.Data.Services;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers
{
    [RoutePrefix("api/advocates")]
    public class AdvocateController : ApiController
    {
        readonly AdvocateService advocateService;

        public AdvocateController(AdvocateService advocateService)
        {
            this.advocateService = advocateService;
        }

        [Route, HttpGet]
        public HttpResponseMessage AdvocateSelectAll()
        {
            PagedItemResponse<Advocate> pagedItemResponse  = advocateService.SelectAllAdvocate();
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Advocate>>
            {
                Item = pagedItemResponse
            });
        }

        [Route, HttpPost, AllowAnonymous]
        public HttpResponseMessage AdvocateInsert(AdvocateInsert advocateInsert)
        {
            if (advocateInsert == null)
            {
                ModelState.AddModelError("", "Data is null");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newId = advocateService.InsertAdvocate(advocateInsert);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int>
            {
                Item = newId
            });
        }

        [Route("{advocateId:int}"), HttpPut]
        public HttpResponseMessage AdvocateUpdate(AdvocateUpdate advocateUpdate, int advocateId)
        {
            if (advocateUpdate == null)
            {
                ModelState.AddModelError("", "Data is null");
            }

            if (advocateId != advocateUpdate.Id)
            {
                ModelState.AddModelError("Id", "Id does not match");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            advocateService.UpdateAdvocate(advocateUpdate);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{advocateId:int}"), HttpDelete]
        public HttpResponseMessage AdvocateDelete(int advocateId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            advocateService.DeleteAdvocate(advocateId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}