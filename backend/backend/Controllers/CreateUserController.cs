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
    //TODO To be deleted.
    [ApiController]
    [Route("[controller]")]
    public class CreateUser : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserManager<User> _userManager;

        public CreateUser(ILogger<UsersController> logger,UserManager<User> userManager)
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
                await _userManager.AddToRoleAsync(user, "User");
                _logger.LogInformation("Account Created",user);
                return Ok();
                
            }

            return BadRequest(result.Errors);



        }
        
        
        
        
    }
}