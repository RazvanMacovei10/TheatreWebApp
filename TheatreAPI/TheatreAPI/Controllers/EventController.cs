using AutoMapper;
using BusinessLogic.Abstract;
using BusinessLogic.BL;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TheatreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventBL _eventBL;
        private readonly IReservationBL _reservationBL;
        private readonly ITheatreBL _theathreBL;
        private readonly IMapper _mapper;
        private readonly IPlayBL _playBL;
        public EventController(IEventBL eventBL, IMapper mapper, ITheatreBL theathreBL, IPlayBL playBL, IReservationBL reservationBL)
        {
            _eventBL = eventBL;
            _mapper = mapper;
            _theathreBL = theathreBL;
            _playBL = playBL;
            _reservationBL = reservationBL;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EventSentDTO eventDTO)
        {
            Theatre theatre = await _theathreBL.GetByUsername(eventDTO.TheatreName);
            Event newEvent = _mapper.Map<Event>(eventDTO);
            newEvent.Theatre = theatre;
            newEvent.Active = true;
            newEvent.TheatreId = theatre.Id;

            await _eventBL.Add(newEvent);
            return Ok();
        }

        [HttpPost("edit/")]
        public async Task<IActionResult> Edit([FromBody] EventSentDTO eventDTO)
        {
            Theatre theatre = await _theathreBL.GetByUsername(eventDTO.TheatreName);
            Play play = await _playBL.GetById(eventDTO.PlayId);
            Event newEvent = _mapper.Map<Event>(eventDTO);
            newEvent.Theatre = theatre;
            newEvent.TheatreId = theatre.Id;
            newEvent.Play = play;
            newEvent.Active = true;
            int id = eventDTO.Id;
            await _eventBL.UpdateEventAsync(id,newEvent);
            return Ok();
        }
        [HttpGet("Cities")]
        public async Task<IList<string>> GetCities()
        {
            var cities = await _eventBL.GetAllCities();
            return cities;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            List<Event> events = (List<Event>)await _eventBL.GetAll();
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        [HttpGet("getEventsByPlay/{id}")]
        public async Task<IActionResult> GetEventsByPlay(int id)
        {
            var currentDate = DateTime.Now;
            List<Event> events = (List<Event>)await _eventBL.GetAll();
            events = events.Where(e => e.PlayId == id).ToList();
            events = events.Where(e => e.DateTime > currentDate).ToList();
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableEvents()
        {
            List<Event> events = (List<Event>)await _eventBL.GetAllAvailable();
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        [HttpGet("FilteredEvents")]
        public async Task<IActionResult> GetFilteredEvents(int priceFrom, int priceTo, string? city, string? name, string? category, DateTime? date = null)
        {
            List<Event> events = await _eventBL.GetAllFiltered(priceFrom, priceTo, city, name, category, date);
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        

        [HttpGet("{name}")]
        public async Task<IActionResult> GetEventsByTheatreId(string name)
        {
            List<Event> events = (List<Event>)await _eventBL.GetAll();
            events = events.Where(e => e.Theatre.User.UserName == name).ToList();
            events = events.Where(e => e.Active == true).ToList();
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Event eventDeleted= await _eventBL.GetById(id);
            var currentDate = DateTime.Now;
            List<Reservation> reservations = (List<Reservation>)await _reservationBL.GetAll();
            reservations = reservations.Where(r => r.EventId == id).ToList();
            reservations = reservations.Where(r => r.Event.DateTime > currentDate).ToList();
            reservations = reservations.Where(r => r.Event.DateTime == eventDeleted.DateTime).ToList();
            reservations = reservations.Where(r => r.Active == true).ToList();
            //await _eventBL.DeleteAsync(id);
            if (reservations.Count == 0)
            {
                eventDeleted.Active = false;
                await _eventBL.UpdateEventAsync(id, eventDeleted);
                return Ok();
            }
            return BadRequest("Cannot delete scheduled event because people reserved it already");
        }
    }
}
