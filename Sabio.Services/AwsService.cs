﻿using Amazon.S3;
using Amazon.S3.Model;
using System;
using Amazon;

namespace Sabio.Services
{
    public class AwsService
    {
        private const string bucketName = "sabio-training";
        private const string filePath = "/C57";
        
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USWest2;
          

        public static string GeneratePreSignedURL(string fileName)
        {
            string accessKey = "AKIAJF53EJKW7SJUV55Q";
            string secretKey = "0XXkz0M4 + dvAycBCS3tR7K + MFNtw7ZRMeQjN97lQ";

            AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, bucketRegion);
            string objectKey = Guid.NewGuid().ToString() + fileName;

            var request = new GetPreSignedUrlRequest //TODO: change to IAmazonS3 when interface is created
            {
                BucketName = bucketName,
                Key = objectKey,
                Verb = HttpVerb.PUT,
                Expires = DateTime.Now.AddMinutes(10)
            };

            string url = s3Client.GetPreSignedURL(request);
            return url;
        }
    }
}
