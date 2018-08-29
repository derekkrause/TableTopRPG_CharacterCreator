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

namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/advoteam")]
    public class AdvoTeamController: ApiController
    {
        public AdvoTeamService advoTeamService;

        public AdvoTeamController(AdvoTeamService advoTeamService)
        {
            this.advoTeamService = advoTeamService; 
        }

        [Route, HttpPost]
        public HttpResponseMessage advoTeamInsert(AdvoTeamInsert advoTeamInsert)
        {
            int advoTeamId = advoTeamService.InsertAdvoTeam(advoTeamInsert);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int>
            {
                Item = advoTeamId
            });
        }

        [Route("{advoteamId:int}"), HttpPut]
        public HttpResponseMessage advoTeamUpdate(AdvoTeamUpdate advoTeamUpdate, int advoTeamId)
        {
            advoTeamService.UpdateAdvoTeam(advoTeamUpdate);
            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int>
            {
                Item = advoTeamId
            });
        }


        [Route("{advoteamId:int}"), HttpDelete]
        public HttpResponseMessage advoTeamDelete(int advoTeamId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            advoTeamService.DeleteAdvoTeam(advoTeamId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}