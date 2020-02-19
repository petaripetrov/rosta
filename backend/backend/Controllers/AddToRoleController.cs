using System.Linq;
using System.Threading.Tasks;
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
    public class AddToRoleController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<CreateUserController> _logger;

        public AddToRoleController(UserManager<User> userManager, ILogger<CreateUserController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Add(UserRoleInput input)
        {
            string[] roles = {"Admin"};
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                if (RoleService.GetAllRoles().Contains(input.Role))
                {
                    var repo = new UserDetailsRepository();
                    var user = _userManager.FindByIdAsync(input.UserId).Result;
                    await _userManager.AddToRoleAsync(user, input.Role);
                    return Ok();
                }

                return BadRequest("Unexisting role");

            }

            return Unauthorized("Only Admin have access to this controller.");
        }
        
        
    }
}