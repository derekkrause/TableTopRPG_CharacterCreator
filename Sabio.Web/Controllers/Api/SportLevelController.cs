using Sabio.Models.Domain;
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
    [RoutePrefix("api")]
    public class SportLevelController : ApiController
    {
        readonly SportLevelService sportLevelService;

        public SportLevelController(SportLevelService sportLevelService)
        {
            this.sportLevelService = sportLevelService;
        }
        [Route("sportLevels"), HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<SportLevel> listOfSportLevels = sportLevelService.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, listOfSportLevels);
        }
    }
}