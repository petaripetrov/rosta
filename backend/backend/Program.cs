using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Infrastructure.Infrastructure_Helpers;
using backend.Models.Data;
using backend.Repositories;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace backend
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            //Google Cloud Storage setup - Candidacy(User) bucket
            string projectId = "deep-castle-261418";
            var credentials =
                GoogleCredential.FromFile(
                    PathHelper.GetCredentialsPath());
            using (var client = await StorageClient.CreateAsync(credentials))
            {
                string bucketName = projectId + "-user-photo-bucket";
                try
                {
                    // Creates the new bucket.
                    client.CreateBucket(projectId, bucketName);

                }
                catch (Google.GoogleApiException e)
                    when (e.Error.Code == 409)
                {
                    // The bucket already exists.  That's fine.
                }



            }

            //Google Cloud Storage setup - Survey bucket
            using (var client = await StorageClient.CreateAsync(credentials))
            {
                string bucketName = projectId + "-survey-photo-bucket";
                try
                {
                    // Creates the new bucket.
                    client.CreateBucket(projectId, bucketName);

                }
                catch (Google.GoogleApiException e)
                    when (e.Error.Code == 409)
                {
                    // The bucket already exists.  That's fine.
                }

                //Roles setup
                using (var serviceScope = host.Services.CreateScope())
                {
                    var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                    if (!await roleManager.RoleExistsAsync("Admin"))
                    {
                        var adminRole = new IdentityRole("Admin");
                        await roleManager.CreateAsync(adminRole);
                    }

                    if (!await roleManager.RoleExistsAsync("SchoolAdmin"))
                    {
                        var posterRole = new IdentityRole("SchoolAdmin");
                        await roleManager.CreateAsync(posterRole);
                    }

                    if (!await roleManager.RoleExistsAsync("User"))
                    {
                        var posterRole = new IdentityRole("User");
                        await roleManager.CreateAsync(posterRole);
                    }

                }
                //default school setup
                var schoolRepo = new SchoolRepository();
                if (!schoolRepo.GetAll().Select(x => x.Name ).Contains("Default"))
                {
                    var defaultSchool = new School("Default");
                    schoolRepo.Add(defaultSchool);
                }

                await host.RunAsync();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}