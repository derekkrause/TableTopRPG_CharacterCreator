using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Security;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{


    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        readonly IUserTableService userTableServices;
        readonly IAuthenticationService authenticationService;

        public UserController(IUserTableService userTableServices, IAuthenticationService authenticationService)
        {
            this.userTableServices = userTableServices;
            this.authenticationService = authenticationService;
        }

        [Route, HttpPost, AllowAnonymous]
        public async Task<HttpResponseMessage> Create(UserCreateRequest userCreateRequest)
        {
            if (userCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var response = await userTableServices.Create(userCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, response);
        }

        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet, Authorize(Roles = "Admin", Users = "")]
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
            ItemResponse<User> itemResponse = new ItemResponse<User> { Item = userTableServices.GetById(id) };

            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("current"), HttpGet]
        public HttpResponseMessage GetCurrent()
        {
            int? id = User.Identity.GetId();
            ItemResponse<User> itemResponse = new ItemResponse<User> { Item = userTableServices.GetById(id.Value) };

            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("login"), HttpPost, AllowAnonymous]
        public HttpResponseMessage Login(UserLoginRequest userLoginRequest)
        {
            if (userLoginRequest == null)
            {
                ModelState.AddModelError("", "Missing Email or Password");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            UserBase userBase = userTableServices.Login(userLoginRequest);

            authenticationService.LogIn(new UserBase
            {
                Id = userBase.Id,
                Name = userBase.Name,
                Roles = userBase.Roles
            });

            return Request.CreateResponse(HttpStatusCode.OK);
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

        [Route("{id:int}"), HttpDelete, Authorize(Roles = "Admin", Users = "")]
        public HttpResponseMessage Delete(int id)
        {
            userTableServices.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("logout"), HttpGet]
        public HttpResponseMessage Logout()
        {
            authenticationService.LogOut();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("confirm"), HttpPut, AllowAnonymous]
        public HttpResponseMessage Confirm(UserConfirmRequest request)
        {
            if (request.TokenId == null)
            {
                ModelState.AddModelError("TokenId", "Invalid or Expired Token");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            userTableServices.Confirm(request);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
    
}