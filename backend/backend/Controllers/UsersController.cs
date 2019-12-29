using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserRepository _repository;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
            _repository = new UserRepository();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> GetById(int id)
        {
            try
            {
                return _repository.GetById(id);
            }
            catch (Exception e)
            {
                return new NotFoundResult();
            }
        }

        [HttpGet()]
        public List<User> GetAll() => _repository.GetAll().ToList();

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<User>> CreateAsync(User user)
        {
            _repository.Add(user);
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
    }
}