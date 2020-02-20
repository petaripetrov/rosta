using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.InputConverters;
using backend.DTOs.SurveyDTOs;
using backend.Models.Identity;
using backend.Repositories;
using backend.Services.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubmitSurveyController : ControllerBase
    {

        private readonly ILogger<SubmitSurveyController> _logger;
        private readonly SurveyRepository _repository;
        private readonly UserManager<User> _userManager;

        public SubmitSurveyController(ILogger<SubmitSurveyController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _repository = new SurveyRepository();
            _userManager = userManager;
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Submit(SurveyInput input)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            var roles = new List<string>(){"User","Admin","SchoolAdmin"};
            var handler = new JwtSecurityTokenHandler();
            var sub = handler.ReadJwtToken(token).Payload.Sub;
            var surveyId = new UserDetailsRepository().GetByUserId(sub).Id;
            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var survey = SurveyInputConverter.Convert(input,surveyId);
                 _repository.Add(survey);

                 return CreatedAtAction("Submit", survey);

            }
            return Unauthorized("Only User, Admin, SchoolAdmin have access to this controller.");

        }
    }
}