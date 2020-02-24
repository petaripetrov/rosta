using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.UserDTOs;
using backend.Models.Data;
using backend.Models.Identity;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CreateUserController : ControllerBase
    {
        private readonly ILogger<CreateUserController> _logger;
        private readonly UserManager<User> _userManager;

        public CreateUserController(ILogger<CreateUserController> logger,UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
            
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create(UserInput input)
        {
            var user = new User {UserName = input.Username, Email =  input.Email};
            
            var result =  await _userManager.CreateAsync(user, input.Password);
            
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(_userManager.FindByEmailAsync(input.Email).Result, "User");
                
                //Adds UserDetails for newly added user
                var repo = new UserDetailsRepository();
                var userDetails = new UserDetails();
                userDetails.UserId = _userManager.FindByEmailAsync(input.Email).Result.Id;
                repo.Add(userDetails);
                var detailsId = repo.GetAll()
                    .First(x => x.UserId == _userManager.FindByEmailAsync(input.Email).Result.Id).Id;

                user.DetailsId = detailsId;
                await _userManager.UpdateAsync(user);
                var schoolRepo = new SchoolRepository();
                var school = schoolRepo.GetAll().FirstOrDefault(x => x.Name == "Default");
                
                
                _logger.LogInformation("Account Created",user);
                return Ok();
                
            }

            return BadRequest(result.Errors);



        }
        
        
        
        
    }
}