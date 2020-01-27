using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.Models.Identity;
using backend.Services.Authorization;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddUserPhotoController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AddUserPhotoController> _logger;

        public AddUserPhotoController(UserManager<User> userManager, ILogger<AddUserPhotoController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        //[Consumes(MediaTypeNames.Image.Jpeg)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        
        public async Task<IActionResult> Add()
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User","Admin","SchoolAdmin"};
            var handler = new JwtSecurityTokenHandler();

            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var httpRequest = HttpContext.Request;
                var file = httpRequest.Body;


                var sub = handler.ReadJwtToken(token).Payload.Sub;
            
                var credentials =
                    GoogleCredential.FromFile("/home/kris/Documents/rosta/backend/backend/Infrastructure/Images/GCStorage/Rosta-a2299c0ab851.json");
                var storage = StorageClient.CreateAsync(credentials);

                var lastId = 0;
                if (storage.Result
                    .ListObjects("deep-castle-261418-user-photo-bucket")
                    .Select(x => x.Name)
                    .Count(x => x.Contains(sub)) > 0)
                {
                    lastId = int.Parse(storage.Result
                        .ListObjects("deep-castle-261418-user-photo-bucket")
                        .Select(x => x.Name).Last(x => x.Contains(sub))
                        .Split("-").Last());
                }
                
                 
                storage.Result.UploadObject("deep-castle-261418-user-photo-bucket", $"{sub}-profilePhoto-{lastId+1}",
                    MediaTypeNames.Image.Jpeg, file, null);
                return Ok();
            }

            return Unauthorized();



        }
    }
}