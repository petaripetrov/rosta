using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using backend.Infrastructure.Infrastructure_Helpers;
using backend.Models.Identity;
using backend.Repositories;
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
    public class GetCandidacyPhotoController: ControllerBase
    {
        private readonly ILogger<GetCandidacyPhotoController> _logger;
        private readonly UserManager<User> _userManager;

        public GetCandidacyPhotoController(ILogger<GetCandidacyPhotoController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get()
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User","Admin","SchoolAdmin"};

            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var candidacyRepo = new CandidacyRepository();
                var detailsRepo = new UserDetailsRepository();
                
                var handler = new JwtSecurityTokenHandler();
                var sub = handler.ReadJwtToken(token).Payload.Sub;

                var details = detailsRepo.GetByUserId(sub);
                var candidacy = candidacyRepo.GetAll().Last(x => x.OwnerId.Value == details.Id);
                
                var credentials =
                    GoogleCredential.FromFile(
                        PathHelper.GetCredentialsPath());
                var storage = StorageClient.CreateAsync(credentials);
                var url = SignedUrlHelper.GenerateV4SignedGetUrl("deep-castle-261418-user-photo-bucket",
                    candidacy.PhotoPath);
                return Ok(url);

            }
            
            return Unauthorized();
        }
    }
}