using BusinessLogic.Abstract;
using Core.AbstractServices;
using DataLayer.DTOs;
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
        private readonly IReservationBL _reservationBL;
        public UsersController(IUserBL userBL,IReservationBL reservationBL)
        {
            _userBL = userBL;
            _reservationBL = reservationBL;
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
        [AllowAnonymous]
        [HttpGet("User/{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var user = await _userBL.GetByUsername(username);
            ClientUserDTO clientUserDTO = new ClientUserDTO();
            List<Reservation> reservations = (List<Reservation>)await _reservationBL.GetAll();

            reservations = reservations.Where(e => e.User.UserName == username).ToList();
            clientUserDTO.Username = username;
            clientUserDTO.NumberOfReservations = reservations.Count;
            clientUserDTO.Email = user.Email;
            return Ok(clientUserDTO);
        }

    }
}
