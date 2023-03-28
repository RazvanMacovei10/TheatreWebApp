﻿using Core.AbstractServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TheatreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserBL _userBL;
        public UsersController(IUserBL userBL)
        {
            _userBL = userBL;
        }

        [AllowAnonymous]
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userBL.GetAll();
            return users;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>>GetUser(int id)
        {
            var user =await _userBL.GetById(id);
            return user;
        }
    }
}
