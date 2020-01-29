using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.CandidacyDTOs;
using backend.DTOs.DTOConverters.Factories;
using backend.Infrastructure.Infrastructure_Helpers;
using backend.Models.Identity;
using backend.Repositories;
using backend.Services.Authorization;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetSurveyPhotoController: ControllerBase
    {
        private readonly ILogger<GetSurveyPhotoController> _logger;
        private readonly UserManager<User> _userManager;

        public GetSurveyPhotoController(ILogger<GetSurveyPhotoController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get(int id)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User","Admin","SchoolAdmin"};

            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var surveyRepo = new SurveyRepository();
                var survey = surveyRepo.GetById(id);
                
                var credentials =
                    GoogleCredential.FromFile(
                        "/home/kris/Documents/rosta/backend/backend/Infrastructure/Images/GCStorage/Rosta-a2299c0ab851.json");
                var storage = StorageClient.CreateAsync(credentials);
                var url = SignedUrlHelper.GenerateV4SignedGetUrl("deep-castle-261418-survey-photo-bucket",
                    survey.PhotoPath);

                return Ok(url);

            }

            return Unauthorized();
        }
    }
}