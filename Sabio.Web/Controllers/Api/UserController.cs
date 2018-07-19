using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        readonly UserTableServices userTableServices;

        public UserController(UserTableServices userTableServices)
        {
            this.userTableServices = userTableServices; 
        }

        [Route("{pageSize:int}/{pageIndex:int}"), HttpGet]
        public HttpResponseMessage GetAll(int pageSize, int pageIndex)
        {
            PagedItemResponse<User> pagedItemResponse = userTableServices.GetAll(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<User>>
            {
                Item = pagedItemResponse
            });
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(UserCreateRequest userCreateRequest)
        {
            if (userCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newUserId = userTableServices.Create(userCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newUserId });
        }
    }
}