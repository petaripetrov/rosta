using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.SchoolDTOs;
using backend.DTOs.SurveyDTOs;
using backend.Models.Identity;
using backend.Repositories;
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
        private readonly Logger<GetAllSchoolsController> _logger;

        public GetAllSchoolsController(Logger<GetAllSchoolsController> logger,UserManager<User> userManager)
        {
            _userManager = userManager;
            _logger = logger;
        }
        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public List<SchoolSummary> Get()
        {
            var repo = new SchoolRepository();
            var userIds = repo.GetAll()
                .Select(x => new
                {
                    Name = x.Name,
                    UserIds = x.Users.Select(x => x.UserId)

                }).ToDictionary(x => x.Name, x => x.UserIds);
            
            
            foreach (var users in userIds.Values)
            {
                foreach (var user in users)
                {
                    
                }
            }

            
            return repo.GetAll().Select(x => new SchoolSummary(x)).ToList();
        }
    }
}