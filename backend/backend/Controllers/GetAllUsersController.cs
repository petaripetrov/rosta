using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
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
    public class GetAllUsersController : ControllerBase
    {
        private readonly ILogger<GetAllUsersController> _logger;
        private readonly UserManager<User> _userManager;

        public GetAllUsersController(ILogger<GetAllUsersController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }
        
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetUsersInSchool(int id)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"Admin","SchoolAdmin"};

            if (RoleService.CheckRoles(token, roles, _userManager))
            {
                var schoolRepo = new SchoolRepository();
                try
                {
                    var school = schoolRepo.GetAll().First(x => x.Id == id);
                    var result = school.Users.Select(x => UserSummaryFactory
                        .CreateSummary(x,_userManager.FindByIdAsync(x.UserId).Result)).ToList();
                
                    return Ok(result);
                }
                catch (Exception e)
                {
                    NotFound(e.Message);
                }
            }

            return Unauthorized("Only Admin, SchoolAdmin have access to this controller.");


        }
    }
}