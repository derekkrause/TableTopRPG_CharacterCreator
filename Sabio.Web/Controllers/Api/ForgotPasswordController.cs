using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/forgot-password")]
    public class ForgotPasswordController : ApiController
    {
        readonly ForgotPasswordService forgotPasswordService;

        public ForgotPasswordController(ForgotPasswordService forgotPasswordService)
        {
            this.forgotPasswordService = forgotPasswordService;
        }

        [Route, HttpPost, AllowAnonymous]
        public async Task<HttpResponseMessage> CheckEmail(ForgotPasswordEmailRequest eMail)
        {
            if (eMail == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            bool hasEmail = forgotPasswordService.CheckEmail(eMail);

            if (hasEmail)
            {
                var response = await forgotPasswordService.SendEmail(eMail);

                return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<SendGrid.Response> { Item = response });
            } else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new ItemResponse<string> { Item = "No Email found" });
            }

            //ItemResponse<HttpResponseMessage> itemResponse = new ItemResponse<HttpResponseMessage> { Item = newEventId }
        }

        [Route("{tokenId}"), HttpGet, AllowAnonymous]
        public HttpResponseMessage VerifyTokenId(string tokenId)
        {
            ForgotPasswordEmailConfirmation emailConfirmation = forgotPasswordService.GetByTokenId(tokenId);
            ItemResponse<ForgotPasswordEmailConfirmation> itemResponse = new ItemResponse<ForgotPasswordEmailConfirmation>
            {
                Item = emailConfirmation
            };

            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("{tokenId}"), HttpPut, AllowAnonymous]
        public HttpResponseMessage UpdateConfirmed(ForgotPasswordUpdateRequest forgotPasswordUpdateRequest, string tokenId)
        {
            if (forgotPasswordUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (forgotPasswordUpdateRequest.TokenId != tokenId)
            {
                ModelState.AddModelError("tokenId", "Token ID in URL does not match Token ID in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (forgotPasswordUpdateRequest.Confirmed == true)
            {
                forgotPasswordService.UpdatePassword(forgotPasswordUpdateRequest);

                return Request.CreateResponse(HttpStatusCode.OK);
            } else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid token!");
            }           
        }
    }
}