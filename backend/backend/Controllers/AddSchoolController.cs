using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.SchoolDTOs;
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
    public class AddSchoolController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AddSchoolController> _logger;

        public AddSchoolController(UserManager<User> userManager, ILogger<AddSchoolController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Add(SchoolInput input)
        {
            string[] roles = {"Admin"};
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var repo = new SchoolRepository();
                var school = new School(input.Name);
                repo.Add(school);
                return Ok();
            }
            return Unauthorized("Only Admin have access to this controller.");
        }
    }
}