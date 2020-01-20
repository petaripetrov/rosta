using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mime;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.DTOs.UserDTOs;
using backend.Infrastructure;
using backend.Models.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly UserManager<User> _userManager;

        public LoginController(ILogger<LoginController> logger,UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
            
        }
        
        
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login(LoginInput input)
        {
            var user = await _userManager.FindByEmailAsync(input.Email);
            var result = _userManager.CheckPasswordAsync(user, input.Password);
            //validate user
            if (result.Result)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                };

                var secretBytes = Encoding.UTF8.GetBytes(Constants.Secret);
                var key = new SymmetricSecurityKey(secretBytes);
                var algorithm = SecurityAlgorithms.HmacSha256;

                var signingCredentials = new SigningCredentials(key, algorithm);
                var token = new JwtSecurityToken(
                    Constants.Issuer,
                    Constants.Audiance,
                    claims,
                    DateTime.Now,
                    DateTime.Now.AddHours(2),
                    signingCredentials
                    );

                var access_token = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(access_token);
            }
            else
            {
                return BadRequest();
            }

            
        }


    }

}