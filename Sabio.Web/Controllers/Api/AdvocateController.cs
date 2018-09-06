using Sabio.Data.Services;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Models.ViewModels;
using Sabio.Services.Security;
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

        [Route("{advocateId:int}"), HttpGet]
        public HttpResponseMessage AdvocateSelectById(int advocateId)
        {
            ItemResponse<Advocate> itemResponse = advocateService.SelectAdvocateById(advocateId);
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
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
            int? currentUserId = User.Identity.GetId();

            if (advocateId != currentUserId)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User not authorized to make changes to this profile.");
            }

            else if (advocateUpdate == null)
            {
                ModelState.AddModelError("", "Data is null");
            }

            else if (advocateId != advocateUpdate.UserId)
            {
                ModelState.AddModelError("Id", "Id does not match");
            }

            else if (!ModelState.IsValid)
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