using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.CandidacyDTOs;
using backend.DTOs.DTOConverters.InputConverters;
using backend.DTOs.UserDTOs;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        public SubmitCandidacyController(ILogger<SubmitCandidacyController> logger)
        {
            _logger = logger;
            _repository = new CandidacyRepository();
        }
        
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public void Submit(CandidacyInput input)
        {
            //TODO Fix this
            //_repository.Add(CandidacyInputConverter.Convert(input));
        }
    }
}