

using Sabio.Data.Services;
using Sabio.Models;
using Sabio.Models.Responses;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Data.Controllers
{

    [RoutePrefix("api/athletes")]
    public class AthletesController : ApiController
    {
        readonly AthletesService athletesService;

        public AthletesController(AthletesService athletesService)
        {
            this.athletesService = athletesService;
        }

        [Route, HttpPost]
        public HttpResponseMessage Insert(AthleteInsertRequest athleteInsertRequest)
        {
            if (athleteInsertRequest == null)
            {
                ModelState.AddModelError("", "Missing body data");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int id = athletesService.Insert(athleteInsertRequest);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemResponse<int> { Item = id });
        }
    }
}