using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{

    [RoutePrefix("api/notifications")]
    public class NotificationsController : ApiController
    {
        readonly INotificationsService notificationsService;

        public NotificationsController(INotificationsService notificationsService)
        {
            this.notificationsService = notificationsService;
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetNotifications(int id)
        {
            List<Notifications> notifications = notificationsService.GetNotifications(id);
            return Request.CreateResponse(HttpStatusCode.OK, notifications);
        }

    }
}