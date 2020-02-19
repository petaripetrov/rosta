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
    public class RoleCheckController : Controller
    {
        private readonly ILogger<RoleCheckController> _logger;
        private readonly UserManager<User> _userManager;

        public RoleCheckController(ILogger<RoleCheckController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> CheckRole()
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            var roles = new List<string>(){"SchoolAdmin","Admin"};
            string role = "User";

            if (RoleService.CheckRole(token, "Admin", _userManager))
            {
                role = "Admin";
            } 
            else if (RoleService.CheckRole(token, "SchoolAdmin", _userManager))
            {
                role = "SchoolAdmin";
            }

            return Ok(new {role = role});
        }
    }
}
