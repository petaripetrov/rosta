using System;
using System.IO;
using System.Linq;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;

namespace backend.Infrastructure.Infrastructure_Helpers
{
    public static class SignedUrlHelper
    {
        public static string GenerateV4SignedGetUrl(string bucketName, string objectName)
        {
            var path = PathHelper.GetCredentialsPath();
            var banichka = "Bas";
            //Change the path if throws exception
            UrlSigner urlSigner = UrlSigner
                
                //.FromServiceAccountPath("/home/kris/Documents/rosta/backend/backend/Infrastructure/Images/GCStorage/Rosta-a2299c0ab851.json")
                .FromServiceAccountPath(path)
                .WithSigningVersion(SigningVersion.V4);
            string url = urlSigner.Sign(bucketName, objectName, TimeSpan.FromHours(1));
            return url;
        }

    }
}