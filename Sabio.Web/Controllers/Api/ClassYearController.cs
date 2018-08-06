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
    [RoutePrefix("api/classyear")]
    public class ClassYearController : ApiController
    {
        readonly ClassYearService classYearService;

        public ClassYearController(ClassYearService classYearService)
        {
            this.classYearService = classYearService;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAllClassYear()
        {
            PagedItemResponse<ClassYear> pagedItemResponse = classYearService.ClassYearGetAll();
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<ClassYear>>
            {
                Item = pagedItemResponse
            });
        }

        [Route("{classYearId:int}"), HttpGet]
        public HttpResponseMessage GetClassYearId(int classYearId)
        {
            ItemResponse<ClassYear> ItemResponse = classYearService.GetClassById(classYearId);
            return Request.CreateResponse(HttpStatusCode.OK, ItemResponse);
        }

        [Route, HttpPost]
        public HttpResponseMessage InsertClassYear(ClassYearInsert classYearInsert)
        {
            if (classYearInsert == null)
            {
                ModelState.AddModelError("", "Data is null");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int classYearId = classYearService.ClassYearInsert(classYearInsert);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int>
            {
                Item = classYearId
            });

        }

        [Route("{classYearId:int}"), HttpPut]
        public HttpResponseMessage UpdateClassYear(ClassYearUpdate classYearUpdate, int classYearId)
        {
            if (classYearUpdate == null)
            {
                ModelState.AddModelError("", "Data is null");
            }

            if (classYearId != classYearUpdate.Id)
            {
                ModelState.AddModelError("Id", "Id does not match");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            classYearService.ClassYearUpdate(classYearUpdate);
            return Request.CreateResponse(HttpStatusCode.OK);

        }

        [Route("{classYearId:int}"), HttpDelete]
        public HttpResponseMessage DeleteClassYear(int classYearId)
        {

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            classYearService.ClassYearDelete(classYearId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}