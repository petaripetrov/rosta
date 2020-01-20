using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.SurveyDTOs;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetAllSurveysController : ControllerBase
    {
        private readonly ILogger<GetAllSurveysController> _logger;
        private readonly SurveyRepository _repository;
        public GetAllSurveysController(ILogger<GetAllSurveysController> logger)
        {
            _logger = logger;
            _repository = new SurveyRepository();
        }
        
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        
        public async Task<IActionResult> GetSurveys(int id)
        {
            var schoolRepo = new SchoolRepository();
            if (!schoolRepo.GetAll().Select(x => x.Id).Contains(id))
            {
                return NotFound("No School with that Id.");
            }
            
            var result = _repository.GetAll().Where(x => x.Author.SchoolId == id).Select(x => new SurveySummary(x)).ToList();
            
            return Ok(result);
            
        }
        
    }
}