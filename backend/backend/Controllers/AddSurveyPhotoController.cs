using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
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
    public class AddSurveyPhotoController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AddSurveyPhotoController> _logger;

        public AddSurveyPhotoController(UserManager<User> userManager, ILogger<AddSurveyPhotoController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]

        public async Task<IActionResult> Add(int id)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User", "Admin", "SchoolAdmin"};
            var handler = new JwtSecurityTokenHandler();
            
            if (RoleService.CheckRoles(token, roles, _userManager))
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
                        "/home/kris/Documents/rosta/backend/backend/Infrastructure/Images/GCStorage/Rosta-a2299c0ab851.json");
                var storage = StorageClient.CreateAsync(credentials);

                var lastId = 0;
                if (storage.Result
                        .ListObjects("deep-castle-261418-survey-photo-bucket")
                        .Select(x => x.Name)
                        .Count(x => x.Contains(sub)) > 0)
                {
                    lastId = int.Parse(storage.Result
                        .ListObjects("deep-castle-261418-survey-photo-bucket")
                        .Select(x => x.Name).Last(x => x.Contains(sub))
                        .Split("-").Last());
                }

                var surveyRepo = new SurveyRepository();
                
                if (!surveyRepo.GetAll().Select(x => x.Id).Contains(id))
                {
                    return BadRequest($"Survey doesnt with {id} exsit");
                }
                
                var detailsRepo = new UserDetailsRepository();
                var detailsId = detailsRepo.GetByUserId(sub).Id;
                
                if (surveyRepo.GetAll().First(x => x.Id == id).AuthorId != detailsId)
                {
                    return BadRequest("You dont have rights to edit that survey");
                }

                var survey = surveyRepo.GetById(id);
                var photoPath = $"{sub}-{survey.Id}-surveyPhoto-{lastId + 1}";
                storage.Result.UploadObject("deep-castle-261418-survey-photo-bucket", photoPath,
                    MediaTypeNames.Image.Jpeg, file, null);

                
                survey.PhotoPath = photoPath;
                surveyRepo.Edit(survey);
                
                return Ok();
            }

            return Unauthorized();
        }
    }
}