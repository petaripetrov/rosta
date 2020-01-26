using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.CandidacyDTOs;
using backend.DTOs.DTOConverters.Factories;
using backend.Models.Identity;
using backend.Repositories;
using backend.Services.Authorization;
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
    public class GetSurveyImageController: ControllerBase
    {
        private readonly ILogger<GetSurveyImageController> _logger;
        private readonly UserManager<User> _userManager;

        public GetSurveyImageController(ILogger<GetSurveyImageController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        public async Task<IActionResult> Get(int id)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User","Admin","SchoolAdmin"};

            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                
            }

            return Unauthorized();
        }
    }
}