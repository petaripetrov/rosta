using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.DTOs.SchoolDTOs;
using backend.DTOs.SurveyDTOs;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace backend.Controllers
{
    public class GetAllSchoolsController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public List<SchoolSummary> Get()
        {
            var repo = new SchoolRepository();
            return repo.GetAll().Select(x => new SchoolSummary(x)).ToList();
        }
    }
}