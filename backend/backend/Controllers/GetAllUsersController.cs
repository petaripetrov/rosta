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
    public class GetAllUsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserRepository _repository;

        public GetAllUsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
            _repository = new UserRepository();
        }

        //TODO
        // Make Asynchronous
        // [HttpGet]
        // public List<User> GetAll()
        // {
        //     return _repository.GetAll().Where(x => x.);
        // }
    }
}