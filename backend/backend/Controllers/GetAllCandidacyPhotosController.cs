using System;
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
    public class GetAllCandidacyPhotosController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<GetAllCandidacyPhotosController> _logger;

        public GetAllCandidacyPhotosController(UserManager<User> userManager, ILogger<GetAllCandidacyPhotosController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get()
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User", "Admin", "SchoolAdmin"};

            var repo = new CandidacyRepository();
            var detailsRepo = new UserDetailsRepository();

            //Gets UserId(sub) from token;
            var handler = new JwtSecurityTokenHandler();
            var sub = handler.ReadJwtToken(token).Payload.Sub;

            var schoolId = detailsRepo.GetAll().First(x => x.UserId == sub).SchoolId;

            if (RoleService.CheckRoles(token, roles, _userManager))
            {
                var candidacies = repo.GetAll().Where(x => detailsRepo.GetById(x.OwnerId.GetValueOrDefault())
                        .SchoolId == schoolId)
                    .Where(x => x.Date.Year == DateTime.Now.Year).ToList();

                var credentials =
                    GoogleCredential.FromFile(
                        PathHelper.GetCredentialsPath());
                var storage = StorageClient.CreateAsync(credentials);
                var result = candidacies.Select(x => new
                {
                    CandidacyId = x.Id,
                    PhotoLink = SignedUrlHelper
                        .GenerateV4SignedGetUrl("deep-castle-261418-user-photo-bucket", x.PhotoPath)
                }).ToList();

                return Ok(result);


            }

            return Unauthorized();


        }
    }
}