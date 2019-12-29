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
    //TODO To be deleted.
    [ApiController]
    [Route("[controller]")]
    public class createUser : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserRepository _repository;

        public createUser(ILogger<UsersController> logger)
        {
            _logger = logger;
            _repository = new UserRepository();
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        //TODO
        //Should be Asynchronous
        public void Create(User user)
        {
            _repository.Add(user);

        }
        
        
        
        
    }
}