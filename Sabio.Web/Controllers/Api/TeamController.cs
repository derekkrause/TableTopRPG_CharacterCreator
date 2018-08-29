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
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/teams")]
    public class TeamController : ApiController
    {
        readonly TeamService teamService;

        public TeamController(TeamService teamService)
        {
            this.teamService = teamService;
        }


        [Route, HttpGet]
        public HttpResponseMessage GetTeamsByAdvocateId()
        {
            int userId = User.Identity.GetId().Value;
            PagedItemResponse<Team> pagedItemResponse = teamService.GetTeamsByAdvocateId(userId);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<PagedItemResponse<Team>>
            {
                Item = pagedItemResponse
            });
        }

        [Route("{teamId:int}"), HttpGet]
        public HttpResponseMessage GetTeamById(int teamId)
        {
            ItemResponse<Team> itemResponse = teamService.GetTeamById(teamId);
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route, HttpPost]
        public HttpResponseMessage TeamInsert(TeamInsert teamInsert)
        {
            if (teamInsert == null)
            {
                ModelState.AddModelError("", "Data is null");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            int teamId = teamService.InsertTeam(teamInsert);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int>
            {
                Item = teamId

            });
        }

        [Route("{teamId:int}"), HttpPut]
        public HttpResponseMessage TeamUpdate(TeamUpdate teamUpdate, int teamId)
        {
            if (teamUpdate == null)
            {
                ModelState.AddModelError("", "Data is null");
            }
            else if (teamId != teamUpdate.Id)
            {
                ModelState.AddModelError("Id", "Id does not match");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            teamService.UpdateTeam(teamUpdate);
            return Request.CreateResponse(HttpStatusCode.OK);

        }

        [Route("{teamId:int}"), HttpDelete]
        public HttpResponseMessage TeamDelete(int teamId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            teamService.DeleteTeam(teamId);
            return Request.CreateResponse(HttpStatusCode.OK);

        }
    }
}