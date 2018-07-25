using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.IO;
using System.Net;

namespace Sabio.Web.Controllers
{
    public class Aws2Service
    {
            private const string bucketName = "sabio-training";
            private const string objectKey = Guid.NewGuid().ToString() + fileName;
            private const string filePath = "/C57";
     
            private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USWest2;
            private static IAmazonS3 s3Client;

            public static void Main()
            {
                s3Client = new AmazonS3Client(bucketRegion);
                var url = GeneratePreSignedURL();
                UploadObject(url);
            }

            private static void UploadObject(string url)
            {
                HttpWebRequest httpRequest = WebRequest.Create(url) as HttpWebRequest;
                httpRequest.Method = "PUT";
                using (Stream dataStream = httpRequest.GetRequestStream())
                {
                    var buffer = new byte[8000];
                    using (FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                    {
                        int bytesRead = 0;
                        while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            dataStream.Write(buffer, 0, bytesRead);
                        }
                    }
                }
                HttpWebResponse response = httpRequest.GetResponse() as HttpWebResponse;
            }

            private static string GeneratePreSignedURL()
            {
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = bucketName,
                    Key = objectKey,
                    Verb = HttpVerb.PUT,
                    Expires = DateTime.Now.AddMinutes(5)
                };

                string url = s3Client.GetPreSignedURL(request);
                return url;
            }
        }
    }

