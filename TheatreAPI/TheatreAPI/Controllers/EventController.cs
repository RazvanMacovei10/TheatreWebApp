using AutoMapper;
using BusinessLogic.Abstract;
using BusinessLogic.BL;
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
        private readonly IPlayBL _playBL;
        public EventController(IEventBL eventBL, IMapper mapper, ITheatreBL theathreBL, IPlayBL playBL)
        {
            _eventBL = eventBL;
            _mapper = mapper;
            _theathreBL = theathreBL;
            _playBL = playBL;
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

        [HttpPost("edit/")]
        public async Task<IActionResult> Edit([FromBody] EventSentDTO eventDTO)
        {
            Theatre theatre = await _theathreBL.GetByUsername(eventDTO.TheatreName);
            Play play = await _playBL.GetById(eventDTO.PlayId);
            Event newEvent = _mapper.Map<Event>(eventDTO);
            newEvent.Theatre = theatre;
            newEvent.TheatreId = theatre.Id;
            newEvent.AvailableSeats = theatre.TotalSeats;
            newEvent.Play = play;
            int id = eventDTO.Id;
            await _eventBL.UpdateEventAsync(id,newEvent);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            List<Event> events = (List<Event>)await _eventBL.GetAll();
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
        [HttpGet("FilteredEvents/{priceFrom}/{priceTo}/{city}/{name}")]
        public async Task<IActionResult> GetFilteredEvents(int priceFrom, int priceTo, string city, string name)
        {
            List<Event> events = (List<Event>)await _eventBL.GetAllFiltered(priceFrom, priceTo,city, name);
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        [HttpGet("FilteredEventsByName/{priceFrom}/{priceTo}/{name}")]
        public async Task<IActionResult> GetFilteredEventsByName(int priceFrom, int priceTo, string name)
        {
            List<Event> events = (List<Event>)await _eventBL.GetAllFiltered(priceFrom, priceTo,null, name);
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        [HttpGet("FilteredEventsByCity/{priceFrom}/{priceTo}/{city}")]
        public async Task<IActionResult> GetFilteredEventsByCity(int priceFrom, int priceTo, string city)
        {
            List<Event> events = (List<Event>)await _eventBL.GetAllFiltered(priceFrom, priceTo, city, null);
            List<EventDTO> eventsDTO = _mapper.Map<List<EventDTO>>(events);
            return Ok(eventsDTO);
        }
        [HttpGet("FilteredEventsByPrice/{priceFrom}/{priceTo}")]
        public async Task<IActionResult> GetFilteredEventsByPrice(int priceFrom, int priceTo)
        {
            List<Event> events = (List<Event>)await _eventBL.GetAllFiltered(priceFrom, priceTo, null, null);
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
