using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.Factories;
using backend.DTOs.UserDTOs;
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
    public class GetSurveyResultsController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<GetSurveyResultsController> _logger;

        public GetSurveyResultsController(UserManager<User> userManager, ILogger<GetSurveyResultsController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get(int id)
        {
            string[] roles = {"Admin","SchoolAdmin","User"};
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var surveyRepo = new SurveyRepository();
                var optionsId = surveyRepo.GetById(id).Options.Select(x => x.Id);
                var results = optionsId.Select(x => SurveyResultFactory.GetResult(x)).ToList();
                
                
                return Ok(results);
            }
            return Unauthorized("Only Admin, SchoolAdmin have access to this controller.");
        }
    }
}