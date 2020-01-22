using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.InputConverters;
using backend.DTOs.OptionDTOs;
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
    public class AddOptionController : ControllerBase
    {
        private readonly ILogger<AddOptionController> _logger;
        private readonly SurveyRepository _surveyRepository;
        private readonly OptionRepository _optionRepository;
        private readonly UserManager<User> _userManager;

        public AddOptionController(ILogger<AddOptionController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
            _surveyRepository = new SurveyRepository();
            _optionRepository = new OptionRepository();
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Add(OptionInput input)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            var roles = new List<string>(){"User","SchoolAdmin","Admin"};

            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var survey = _surveyRepository.GetById(input.SurveyId);
                var option = OptionInputConverter.Convert(input);
            
                _optionRepository.Add(option);
                survey.AddOption(option);
                return CreatedAtAction("Add", option);
            }

            return Unauthorized("Only User, SchoolAdmin, Admin can access this controller.");

        }
    }
}