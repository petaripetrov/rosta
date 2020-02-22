using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.Infrastructure.Infrastructure_Helpers;
using backend.Models.Identity;
using backend.Repositories;
using backend.Services.Authorization;
using backend.Services.Security;
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
    public class AddCandidacyPhotoController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AddCandidacyPhotoController> _logger;

        public AddCandidacyPhotoController(UserManager<User> userManager, ILogger<AddCandidacyPhotoController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        
        public async Task<IActionResult> Add()
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User","Admin"};
            var handler = new JwtSecurityTokenHandler();

            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var httpRequest = HttpContext.Request;
                var file = httpRequest.Body;

                //checks the size of file
                var imageHandler = new ImageSecurityHandler();
                if (!imageHandler.CheckFileSize(httpRequest.ContentLength.Value))
                {
                    
                    _logger.LogInformation($"size is {httpRequest.ContentLength}");
                    return BadRequest("Photo must be between 5KB and 5MB");
                }
                //checks the format of file
                if (!imageHandler.CheckFileFormat(httpRequest.ContentType))
                {
                    _logger.LogInformation($"file format is {httpRequest.ContentType}");
                    return BadRequest("Wrong file format");
                }

                var sub = handler.ReadJwtToken(token).Payload.Sub;
            
                var credentials =
                    GoogleCredential.FromFile(
                        PathHelper.GetCredentialsPath());
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

                
                var detailsRepository = new UserDetailsRepository();
                var details = detailsRepository.GetByUserId(sub);
                var candidacyRepository = new CandidacyRepository();
                var candidacy = candidacyRepository.GetAll().Last(x => x.OwnerId == details.Id);

                //Checks if User have candidacy
                if (candidacyRepository.GetAll().Count(x => x.OwnerId == details.Id) == 0)
                {
                    return BadRequest("User didnt submited candidacy.");
                }
                
                //Uploading Photo to Google Cloud and updating indecies.
                var photoName = $"{sub}-profilePhoto-{lastId + 1}";
                storage.Result.UploadObject("deep-castle-261418-user-photo-bucket",photoName,
                    MediaTypeNames.Image.Jpeg, file, null);
                
                candidacy.PhotoPath = photoName;
                candidacyRepository.Edit(candidacy);
                
                return Ok();
            }

            return Unauthorized();



        }
    }
}