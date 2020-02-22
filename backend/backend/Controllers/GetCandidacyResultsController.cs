using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.UserDTOs;
using backend.Models.Data;
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
    public class GetCandidacyResultsController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<GetCandidacyResultsController> _logger;

        public GetCandidacyResultsController(UserManager<User> userManager, ILogger<GetCandidacyResultsController> logger)
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
                
                
                return Ok();
            }
            return Unauthorized("Only Admin, SchoolAdmin have access to this controller.");
        }
    }
}