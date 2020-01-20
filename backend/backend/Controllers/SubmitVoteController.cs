using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.InputConverters;
using backend.DTOs.SurveyDTOs;
using backend.DTOs.VoteDTOs;
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
    public class SubmitVoteController : ControllerBase
    {
        private readonly ILogger<SubmitSurveyController> _logger;
        private readonly VoteRepository _repository;
        private readonly UserManager<User> _userManager;

        public SubmitVoteController(ILogger<SubmitSurveyController> logger,UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
            _repository = new VoteRepository();
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Submit(VoteInput input)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var sub = handler.ReadJwtToken(token).Payload.Sub;
            var roles = new List<string>(){"User"};
            
            if (RoleService.CheckRoles(token,roles,_userManager))
            {
                var vote = VoteInputConverter.Convert(input);
                _repository.Add(vote);
                return CreatedAtAction("Submit", vote);
            }
            else
            {
                return BadRequest("Only Users can vote.");
            }
           
            
        }
    }
}