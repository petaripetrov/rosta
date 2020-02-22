using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.CandidacyVoteDTOs;
using backend.DTOs.DTOConverters.InputConverters;
using backend.Models.Data;
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
    public class SubmitCandidacyVoteController : ControllerBase
    {
        private readonly ILogger<SubmitCandidacyVoteController> _logger;
        private readonly CandidacyVoteRepository _repository;
        private readonly UserManager<User> _userManager;

        public SubmitCandidacyVoteController(ILogger<SubmitCandidacyVoteController> logger, UserManager<User> userManager)
        {
            _logger = logger;
            _userManager = userManager;
            _repository = new CandidacyVoteRepository();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Submit(CandidacyVoteInput input)
        {
            var token = HttpContext.Request.Headers["Authorization"].Last().Split(" ").Last();
            var roles = new List<string>(){"User"};
            
            var handler = new JwtSecurityTokenHandler();
            var sub = handler.ReadJwtToken(token).Payload.Sub;
            
            if (RoleService.CheckRoles(token,roles,_userManager))
            {

                var detailsRepo = new UserDetailsRepository();
                var voteRecordsRepo = new CandidacyVoteRecordRepository();
                var detailsId = detailsRepo.GetByUserId(sub).Id;
                var record = new CandidacyVoteRecord(detailsId);
                var vote = CandidacyVoteInputConvertor.Convert(input);
                

                if (detailsRepo.GetByUserId(sub).SchoolId != new CandidacyRepository().GetById(input.CandidacyId).Owner.SchoolId)
                {
                    return BadRequest("You can vote only in you school");
                }

                if (voteRecordsRepo
                    .GetAll().Count(x => x.UserDetailsId == detailsId && x.Date.Year == DateTime.Now.Year) > 0)
                {
                    return BadRequest("You can vote only in once in a year");
                }

                _repository.Add(vote);
                voteRecordsRepo.Add(record);
                
                return Ok();


            }
            return Unauthorized("Only Users can vote on surveys");
        }
    }
}