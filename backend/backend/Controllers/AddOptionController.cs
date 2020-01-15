using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.DTOConverters.InputConverters;
using backend.DTOs.OptionDTOs;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddOptionController : ControllerBase
    {
        private ILogger<AddOptionController> _logger;
        private SurveyRepository _surveyRepository;
        private OptionRepository _optionRepository;

        public AddOptionController(ILogger<AddOptionController> logger)
        {
            _logger = logger;
            _surveyRepository = new SurveyRepository();
            _optionRepository = new OptionRepository();
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public void Add(OptionInput input)
        {
            var survey = _surveyRepository.GetById(input.SurveyId);
            var option = OptionInputConverter.Convert(input);
            
            _optionRepository.Add(option);
            survey.AddOption(option);
            
        }
    }
}