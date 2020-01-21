using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.CandidacyDTOs;
using backend.DTOs.DTOConverters.InputConverters;
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
    public class SubmitCandidacyController : ControllerBase
    {
        private readonly ILogger<SubmitCandidacyController> _logger;
        private readonly CandidacyRepository _repository;
        private readonly UserManager<User> _usermanager;

        public SubmitCandidacyController(ILogger<SubmitCandidacyController> logger,UserManager<User> userManager)
        {
            _logger = logger;
            _repository = new CandidacyRepository();
            _usermanager = userManager;
        }
        
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Submit(CandidacyInput input)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            var roles = new List<string>(){"User"};
            if (RoleService.CheckRoles(token,roles,_usermanager))
            {
                var candidacy = CandidacyInputConverter.Convert(input);
                _repository.Add(candidacy);
                return CreatedAtAction("Submit", candidacy);
            }
            return Unauthorized("Only User have access to this controller.");
        }
    }
}