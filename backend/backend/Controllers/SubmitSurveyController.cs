using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.InputConverters;
using backend.DTOs.SurveyDTOs;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubmitSurveyController : ControllerBase
    {

        private readonly ILogger<SubmitSurveyController> _logger;
        private readonly SurveyRepository _repository;

        public SubmitSurveyController(ILogger<SubmitSurveyController> logger)
        {
            _logger = logger;
            _repository = new SurveyRepository();
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public void Submit(SurveyInput input)
        {
            _repository.Add(SurveyInputConverter.Convert(input));
        }
    }
}