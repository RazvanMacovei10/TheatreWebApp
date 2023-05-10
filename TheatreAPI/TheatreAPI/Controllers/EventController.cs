using AutoMapper;
using BusinessLogic.Abstract;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TheatreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventBL _eventBL;
        private readonly ITheatreBL _theathreBL;
        private readonly IMapper _mapper;
        public EventController(IEventBL eventBL, IMapper mapper, ITheatreBL theathreBL)
        {
            _eventBL = eventBL;
            _mapper = mapper;
            _theathreBL = theathreBL;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EventSentDTO eventDTO)
        {
            Theatre theatre = await _theathreBL.GetByUsername(eventDTO.TheatreName);
            Event newEvent = _mapper.Map<Event>(eventDTO);
            newEvent.Theatre = theatre;
            newEvent.TheatreId = theatre.Id;
            newEvent.AvailableSeats = theatre.TotalSeats;

            await _eventBL.Add(newEvent);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            List<Event> events = (List<Event>)await _eventBL.GetAll();
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        [HttpGet("FilteredEvents/{city}/{name?}")]
        public async Task<IActionResult> GetFilteredEvents(string city,string? name=null)
        {
            List<Event> events = (List<Event>)await _eventBL.GetAllFiltered(city,name);
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetEventsByTheatreId(string name)
        {
            List<Event> events = (List<Event>)await _eventBL.GetAll();
            events = events.Where(e => e.Theatre.User.UserName == name).ToList();
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _eventBL.DeleteAsync(id);
            return Ok();
        }
    }
}
