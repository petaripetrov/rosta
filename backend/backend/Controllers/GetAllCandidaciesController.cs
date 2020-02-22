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
    public class GetAllCandidaciesController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<GetAllCandidaciesController> _logger;

        public GetAllCandidaciesController(UserManager<User> userManager, ILogger<GetAllCandidaciesController> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get()
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User","Admin","SchoolAdmin"};

            var repo = new CandidacyRepository();
            var detailsRepo = new UserDetailsRepository();
            
            //Gets UserId(sub) fro token;
            var handler = new JwtSecurityTokenHandler();
            var sub = handler.ReadJwtToken(token).Payload.Sub;

            var schoolId = detailsRepo.GetAll().First(x => x.UserId == sub).SchoolId;
            
            
            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                
                var result = repo.GetAll().Where(x => detailsRepo.GetById(x.OwnerId.GetValueOrDefault())
                    .SchoolId == schoolId).Where(x => x.Date.Year== DateTime.Now.Year).ToList();
                return Ok(result);
            }

            return Unauthorized();
        }
        
    }
}