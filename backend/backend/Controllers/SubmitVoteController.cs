using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.InputConverters;
using backend.DTOs.SurveyDTOs;
using backend.DTOs.VoteDTOs;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        public SubmitVoteController(ILogger<SubmitSurveyController> logger)
        {
            _logger = logger;
            _repository = new VoteRepository();
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public void Submit(VoteInput input)
        {
            _repository.Add(VoteInputConverter.Convert(input));
        }
    }
}