using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
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
    public class GetAllUsersController : ControllerBase
    {
        private readonly ILogger<GetAllUsersController> _logger;

        public GetAllUsersController(ILogger<GetAllUsersController> logger)
        {
            _logger = logger;
        }

        //TODO
        // Make Asynchronous
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public List<UserSummary> GetUsersInSchool(int id)
        {
            var schoolRepo = new SchoolRepository();
            try
            {
                var school = schoolRepo.GetAll().First(x => x.Id == id);
                var result = school.Users.Select(x => new UserSummary(x)).ToList();
               
                return result;
            }
            catch (Exception e)
            {
                NotFound();
            }

            return null;


        }
    }
}