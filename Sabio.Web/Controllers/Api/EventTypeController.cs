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

namespace Sabio.Web.Controllers
{
    [RoutePrefix("api/eventtype")]
    public class EventTypeController : ApiController
    {
        readonly EventTypeService eventTypeService;

        public EventTypeController(EventTypeService eventTypeService)
        {
            this.eventTypeService = eventTypeService;
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(EventTypeCreateRequest eventTypeCreateRequest)
        {
            if (eventTypeCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newEventTypeId = eventTypeService.Create(eventTypeCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newEventTypeId });
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<EventType> eventTypes = eventTypeService.GetAll();
            ItemsResponse<EventType> itemsResponse = new ItemsResponse<EventType>
            {
                Items = eventTypes
            };

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route("{eventTypeId:int}"), HttpGet]
        public HttpResponseMessage GetById(int eventTypeId)
        {
            EventType oneEventType = new EventType();

            oneEventType = eventTypeService.GetById(eventTypeId);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<EventType> { Item = oneEventType });
        }

        [Route("{eventTypeId:int}"), HttpPut]
        public HttpResponseMessage Update(EventTypeUpdateRequest eventTypeUpdateRequest, int eventTypeId)
        {
            if (eventTypeUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            else if (eventTypeUpdateRequest.Id != eventTypeId)
            {
                ModelState.AddModelError("id", "ID in URL does not match ID in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            eventTypeService.Update(eventTypeUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{eventTypeId:int}"), HttpDelete]
        public HttpResponseMessage Delete(int eventTypeId)
        {
            eventTypeService.Delete(eventTypeId);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("search"), HttpGet]
        public HttpResponseMessage SearchAll(string q)
        {
            ItemsResponse<EventType> itemsResponse = new ItemsResponse<EventType>();
            List<EventType> results = new List<EventType>();

            results = eventTypeService.SearchAll(q);
            itemsResponse.Items = results;

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }
    }
}