using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers
{
    [RoutePrefix("api/events")]
    public class EventController : ApiController
    {
        readonly EventService eventService;

        public EventController(EventService eventService)
        {
            this.eventService = eventService;
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(EventCreateRequest eventCreateRequest)
        {
            if (eventCreateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int newEventId = eventService.Create(eventCreateRequest);

            return Request.CreateResponse(HttpStatusCode.Created, new ItemResponse<int> { Item = newEventId });
        }

        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage GetAllPaging(int pageIndex, int pageSize)
        {
            PagedItemResponse<Event> pagedItemResponse = eventService.GetAllPaging(pageIndex, pageSize);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Event>>
            {
                Item = pagedItemResponse
            });
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<Event> events = eventService.GetAll();
            ItemsResponse<Event> itemsResponse = new ItemsResponse<Event> { Items = events };

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route("{eventId:int}"), HttpGet]
        public HttpResponseMessage GetById(int eventId)
        {
            Event oneEvent = eventService.GetById(eventId);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Event> { Item = oneEvent });
        }

        [Route("{eventId:int}"), HttpPut]
        public HttpResponseMessage Update(EventUpdateRequest eventUpdateRequest, int eventId)
        {
            if (eventUpdateRequest == null)
            {
                ModelState.AddModelError("", "missing body data");
            }
            else if (eventUpdateRequest.Id != eventId)
            {
                ModelState.AddModelError("id", "ID in URL does not match ID in body");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            eventService.Update(eventUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("{eventId:int}"), HttpDelete]
        public HttpResponseMessage Delete(int eventId)
        {
            eventService.Delete(eventId);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("search/{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage SearchAllPaging(int pageIndex, int pageSize, string q)
        {
            PagedItemResponse<Event> pagedItemResponse = eventService.SearchAllPaging(pageIndex, pageSize, q);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Event>>
            {
                Item = pagedItemResponse
            });
        }

        [Route("search"), HttpGet]
        public HttpResponseMessage SearchAll(string q)
        {
            List<Event> events = eventService.SearchAll(q);
            ItemsResponse<Event> itemsResponse = new ItemsResponse<Event>();

            itemsResponse.Items = events;
        
            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route("searchfilters"), HttpGet]
        public HttpResponseMessage SearchAllWithFilters(string q = null, string s = null, int? t = null, DateTime? u = null, 
            DateTime? v = null, int? w = null)
        {
            
            List<Event> events = eventService.SearchAllWithFilters(q, s, t, u, v, w);
            ItemsResponse<Event> itemsResponse = new ItemsResponse<Event>();

            itemsResponse.Items = events;

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route("searchfilters/{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage SearchAllPagingWithFilters(int pageIndex, int pageSize, DateTime sd, string q = null, string st = null, 
            int? t = null, DateTime? ed = null, int? sdist = null)
        {
            //PagedItemResponse<Event> SearchAllPagingWithFilters(int pageIndex, int pageSize, string searchTerms = null,
            //string searchState = null, int? searchEventType = null, DateTime searchStartDate, DateTime? searchEndDate = null,
            //int? searchDistance = null);

            //List<Event> events = eventService.SearchAllWithFilters(q, s, t, u, v, w);

            PagedItemResponse<Event> pagedItemResponse = eventService.SearchAllPagingWithFilters(pageIndex, pageSize, sd, q, st, t, ed, 
                sdist);

            ItemResponse<PagedItemResponse<Event>> itemResponse = new ItemResponse<PagedItemResponse<Event>>
            {
                Item = pagedItemResponse
            };

            //ItemsResponse<Event> itemsResponse = new ItemsResponse<Event>();

            //itemsResponse.Items = events;

            //return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);

            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("user/{userId:int}"), HttpGet]
        public HttpResponseMessage GetByUserId(int userId)
        {
            List<Event> userEvents = eventService.GetByUserId(userId);
            ItemsResponse<Event> userEventItems = new ItemsResponse<Event>
            {
                Items = userEvents
            };

            return Request.CreateResponse(HttpStatusCode.OK, userEventItems);
        }

        [Route("withuser/{eventId:int}"), HttpGet]
        public HttpResponseMessage GetByIdWithUser(int eventId)
        {
            EventUser oneEvent = eventService.GetByIdWithUser(eventId);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<Event> { Item = oneEvent });
        }

        [Route("upcoming"), HttpGet]
        public HttpResponseMessage GetUpcoming()
        {
            List<Event> events = eventService.GetUpcoming();
            ItemsResponse<Event> itemsResponse = new ItemsResponse<Event> { Items = events };

            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }
    }
}