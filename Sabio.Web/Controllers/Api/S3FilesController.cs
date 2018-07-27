using Sabio.Models.Responses;
using Sabio.Services;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;



namespace Sabio.Web.Controllers.Api
{
    [RoutePrefix("api/s3files")]
    public class S3FilesController:ApiController
    {
        [Route, HttpPut]
        public HttpResponseMessage GeneratePreSignedURL()
        {
            string url = S3FilesService.GeneratePreSignedURL();

            ItemResponse<string> itemResponse = new ItemResponse<string>
            {
                Item = url
            };
           
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }
    }
}