using BusinessLogic.Abstract;
using BusinessLogic.BL;
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
        private readonly ITheatreBL _theatreBL;
        private readonly IReservationBL _reservationBL;
        private readonly IEventBL _eventBL;
        private readonly IPlayBL _playBL;
        public UsersController(IUserBL userBL,IReservationBL reservationBL, ITheatreBL theatreBL, IEventBL eventBL, IPlayBL playBL)
        {
            _userBL = userBL;
            _reservationBL = reservationBL;
            _theatreBL = theatreBL;
            _eventBL = eventBL;
            _playBL = playBL;
        }

        [AllowAnonymous]
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userBL.GetAll();
            return users;
        }
        [HttpPost("{username}")]
        public async Task<ActionResult<User>> SetAs(int id)
        {
            var user = await _userBL.GetById(id);
            return user;
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
        [AllowAnonymous]
        [HttpGet("Theatre/{username}")]
        public async Task<IActionResult> GetTheatreByUsername(string username)
        {
            var user = await _userBL.GetByUsername(username);
            var theatre = await _theatreBL.GetByUsername(username);
            List<Event> events = (List<Event>)await _eventBL.GetAll();
            events = events.Where(e => e.Theatre.User.UserName == username).ToList();

            List<Play> plays = (List<Play>)await _playBL.GetAll();
            plays = plays.Where(p => p.Theatre.User.UserName == username).ToList();
            TheatreAccountDetailsDTO theatreAccountDetailsDTO = new TheatreAccountDetailsDTO();
            List<Reservation> reservations = (List<Reservation>)await _reservationBL.GetAll();

            reservations = reservations.Where(e => e.User.UserName == username).ToList();
            theatreAccountDetailsDTO.Username = username;
            theatreAccountDetailsDTO.Name = theatre.Name;
            theatreAccountDetailsDTO.NumberOfEvents = plays.Count();
            theatreAccountDetailsDTO.Image = Convert.ToBase64String(theatre.Image);
            theatreAccountDetailsDTO.NumberOfEventsScheduled = events.Count();
            theatreAccountDetailsDTO.Email = user.Email;
            return Ok(theatreAccountDetailsDTO);
        }

    }
}
