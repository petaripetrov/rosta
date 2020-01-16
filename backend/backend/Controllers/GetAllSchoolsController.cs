using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.SchoolDTOs;
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
    public class GetAllSchoolsController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public List<SchoolSummary> Get()
        {
            var repo = new SchoolRepository();
            return repo.GetAll().Select(x => new SchoolSummary(x)).ToList();
        }
    }
}