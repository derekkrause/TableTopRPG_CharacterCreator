using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
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
    [RoutePrefix("api/eventusers")]
    public class EventUserTableController : ApiController
    {
        readonly EventUserTableService eventUserTableService;

        public EventUserTableController(EventUserTableService eventUserTableService)
        {
            this.eventUserTableService = eventUserTableService;
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(EventUserTableCreateRequest eventUserTableCreateRequest)
        {
            if (eventUserTableCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newEventUserTableId = eventUserTableService.Create(eventUserTableCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newEventUserTableId });
        }

        [Route("event/{eventId:int}"), HttpGet]
        public HttpResponseMessage GetByEventId(int eventId)
        {
            List<EventUserTable> eventUserTableItems = eventUserTableService.GetByEventId(eventId);
            ItemsResponse<EventUserTable> itemsResponse = new ItemsResponse<EventUserTable>
            {
                Items = eventUserTableItems
            };

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<EventUserTable> eventUserTableItems = eventUserTableService.GetAll();
            ItemsResponse<EventUserTable> itemsResponse = new ItemsResponse<EventUserTable>
            {
                Items = eventUserTableItems
            };

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route("event/{eventId:int}/{userId:int}"), HttpDelete]
        public HttpResponseMessage Delete(int eventId, int userId)
        {
            eventUserTableService.DeleteByEventIdUserId(eventId, userId);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("attendees/{eventId:int}"), HttpGet]
        public HttpResponseMessage GetByEventIdWithAttendees(int eventId)
        {
            List<EventUserAttendee> eventUserAttendees = eventUserTableService.GetByEventIdWithAttendees(eventId);

            ItemsResponse<EventUserAttendee> itemsResponse = new ItemsResponse<EventUserAttendee>
            {
                Items = eventUserAttendees
            };

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }
    }
}