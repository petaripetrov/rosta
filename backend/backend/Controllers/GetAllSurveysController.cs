using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using backend.DTOs.SurveyDTOs;
using backend.Models.Identity;
using backend.Repositories;
using backend.Services.Authorization;
using BCrypt;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetAllSurveysController : ControllerBase
    {
        private readonly ILogger<GetAllSurveysController> _logger;
        private readonly SurveyRepository _repository;
        private readonly UserManager<User> _usermanager;

        public GetAllSurveysController(ILogger<GetAllSurveysController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _repository = new SurveyRepository();
            _usermanager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]

        public async Task<IActionResult> GetSurveys()
        {
            var schoolRepo = new SchoolRepository();
            
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"User","Admin","SchoolAdmin"};
            
            var handler = new JwtSecurityTokenHandler();
            var sub = handler.ReadJwtToken(token).Payload.Sub;
            
            var detailsRepo = new UserDetailsRepository();
            var id = detailsRepo.GetByUserId(sub).SchoolId.Value;
            
            //Checks if the User have needed role to access all surveys and if User is in that school
            if (RoleService.CheckRoles(token, roles, _usermanager))
            {
                var result = _repository.GetAll().Where(x => x.Author.SchoolId == id).Select(x => new SurveySummary(x))
                    .ToList();

                return Ok(result);
            }

            return NotFound();
        }
        
    }
}