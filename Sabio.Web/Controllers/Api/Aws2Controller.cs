using Sabio.Models.Responses;
using Sabio.Services;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers
{
    [RoutePrefix("api/files")]
    public class Aws2Controller: ApiController
    {
        [Route, HttpPut]
        public HttpResponseMessage GeneratePreSignedURL()
        {
            var file = HttpContext.Current.Request.Files[0];

            var fileName = Path.GetFileName(file.FileName);


            string url = AwsService.GeneratePreSignedURL(fileName);

            ItemResponse<string> itemResponse = new ItemResponse<string>
            {
                Item = url
            };

            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route, HttpGet]
        public HttpResponseMessage Get()
        {

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
