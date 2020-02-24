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

        private string  GetRole(string userId)
        {
            var user = _userManager.FindByIdAsync(userId).Result;
            string role = _userManager.GetRolesAsync(user).Result.LastOrDefault();
            return role;
        }

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
            var schoolRepo = new SchoolRepository();

            if (!schoolRepo.GetAll().Select(x => x.Id).Contains(id) && id != 0)
            {
                return BadRequest("Not such id");
            }
            

            if (RoleService.CheckRoles(token, roles, _userManager))
            {
                if (RoleService.CheckRole(token,"Admin",_userManager))
                {
                    
                    if (id == 0)
                    {
                        var detailsRepo = new UserDetailsRepository();
                        var result = detailsRepo.GetAll().Select(x => UserSummaryFactory
                            .CreateSummary(x,_userManager.FindByIdAsync(x.UserId).Result)).ToList();
                        result.ForEach(x => x.Role = GetRole(x.Id));
                        
                        
                        return Ok(result);
                    }
                    else
                    {
                        try
                        {
                            
                            var school = schoolRepo.GetAll().First(x => x.Id == id);
                            var result = school.Users.Select(x => UserSummaryFactory
                                .CreateSummary(x,_userManager.FindByIdAsync(x.UserId).Result)).ToList();

                            for (int i = 0; i < result.Count(); i++)
                            {
                                result[i].Role = GetRole(result[i].Id);
                            }
                            //result.ForEach(x => x.Role = GetRole(x.Id));
                
                            return Ok(result);
                        }
                        catch (Exception e)
                        {
                            NotFound(e.Message);
                        }
                    }
                   
                 
                }
                else
                {
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
                
                
            }

            return Unauthorized("Only Admin, SchoolAdmin have access to this controller.");


        }
    }
}