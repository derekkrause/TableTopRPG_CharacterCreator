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
        readonly IUserTableService userTableServices;

        public UserController(IUserTableService userTableServices)
        {
            this.userTableServices = userTableServices;
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

        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage GetAll(int pageIndex, int pageSize)
        {
            PagedItemResponse<User> pagedItemResponse = userTableServices.GetAll(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<User>>
            {
                Item = pagedItemResponse
            });
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            ItemResponse<User> itemResponse = userTableServices.GetById(id);

            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("login"), HttpPost]
        public HttpResponseMessage Login(UserLoginRequest userLoginRequest)
        {
            if(userLoginRequest == null)
            {
                ModelState.AddModelError("", "Missing Email or Password");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            bool loginSuccess = userTableServices.Login(userLoginRequest);

            if (loginSuccess == false)
            {
                return Request.CreateResponse("Invalid Email and/or Password");
            }

            return Request.CreateResponse(HttpStatusCode.OK, loginSuccess);
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(UserUpdateRequest userUpdateRequest, int id)
        {
            if (userUpdateRequest == null)
            {
                ModelState.AddModelError("", "Missing id");
            }
            else if (userUpdateRequest.Id != id)
            {
                ModelState.AddModelError("id", "Id in URL does not match Id in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            userTableServices.Update(userUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            userTableServices.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}