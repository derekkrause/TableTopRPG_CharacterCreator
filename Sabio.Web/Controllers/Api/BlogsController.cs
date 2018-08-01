﻿using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/blogs")]
    public class BlogsController : ApiController
    {
        readonly BlogsService blogsService;

        public BlogsController(BlogsService blogsService)
        {
            this.blogsService = blogsService;
        }

        [Route("{blogId:int}"), HttpDelete]
        public HttpResponseMessage Delete(int blogId)
        {
            blogsService.Delete(blogId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{blogId:int}"), HttpPut]
        public HttpResponseMessage Update(BlogUpdateRequest blogUpdateRequest, int blogId)
        {
            if(blogUpdateRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }
            else if (blogUpdateRequest.Id != blogId)
            {
                ModelState.AddModelError("id", "ID in URL does not match ID in body");
            }
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            blogsService.Update(blogUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{pageIndex:int?}/{pageSize:int?}"), HttpGet]
        public HttpResponseMessage GetAll(int pageIndex=0, int pageSize=20)
        {
            PagedItemResponse<Blog> pagedItemResponse = blogsService.GetAll(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Blog>>
            {
                Item = pagedItemResponse
            });
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(BlogCreateRequest blogCreateRequest)
        {
            if (blogCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int authorId = 3; //TODO: update to userId from cookies yum

            int newBlogId = blogsService.Create(blogCreateRequest, authorId);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newBlogId });
        }

    }
}