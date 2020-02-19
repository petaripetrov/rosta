using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.Factories;
using backend.DTOs.SchoolDTOs;
using backend.DTOs.SurveyDTOs;
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
    public class GetAllSchoolsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ILogger<GetAllSchoolsController> _logger;

        public GetAllSchoolsController(ILogger<GetAllSchoolsController> logger,UserManager<User> userManager)
        {
            _userManager = userManager;
            _logger = logger;
        }
        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Get()
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            string[] roles = {"Admin","SchoolAdmin"};

            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var repo = new SchoolRepository();
                var userIds = repo.GetAll()
                    .Select(x => new
                    {
                        Name = x.Name,
                        UserIds = x.Users.Select(x => x.UserId)

                    }).ToDictionary(x => x.Name, x => x.UserIds);
            
                var SchoolsUsers = new Dictionary<string,List<User>>();
            
                foreach (var school in userIds.Keys)
                {
                    SchoolsUsers.Add(school,userIds[school].Select(x => _userManager.FindByIdAsync(x).Result).ToList());
                }
            
                var detailsRepo = new UserDetailsRepository();

            
                //Produces summary for each school with summaries for each of students.
                var result = repo.GetAll().Select(x => new SchoolSummary(x.Id,x.Name,SchoolsUsers[x.Name]
                    .Select(x => UserSummaryFactory.CreateSummary(detailsRepo.GetById(x.DetailsId),x)).ToList())).ToList();
            
                return Ok(result);
            }

            return Unauthorized("Only Admin and SchoolAdmin roles have permission to this controller.");
        }
    }
}