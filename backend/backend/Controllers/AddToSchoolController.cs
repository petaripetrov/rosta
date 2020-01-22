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
    public class AddToSchoolController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AddToSchoolController> _logger;

        public AddToSchoolController(UserManager<User> userManager, ILogger<AddToSchoolController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Add(UserSchoolInput input)
        {
            string[] roles = {"Admin","SchoolAdmin"};
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var userDetailsRepo = new UserDetailsRepository();
                var userDetails = userDetailsRepo.GetAll().First(x => x.UserId == input.UserId);
                userDetails.SchoolId = input.SchoolId;
                userDetailsRepo.Edit(userDetails);
                
                return Ok();
            }
            return Unauthorized("Only Admin, SchoolAdmin have access to this controller.");
        }
    }
}