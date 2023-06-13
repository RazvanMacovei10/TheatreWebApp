using AutoMapper;
using BusinessLogic.Abstract;
using BusinessLogic.BL;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace TheatreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayController : ControllerBase
    {
        private readonly IPlayBL _playBL;
        private readonly IPlayTypeBL _playTypeBL;
        private readonly IMapper _mapper;
        private readonly IEventBL _eventBL;
        private readonly ITheatreBL _theatreBL;
        public PlayController(IPlayBL playBL, IMapper mapper, ITheatreBL theatreBL, IPlayTypeBL playTypeBL, IEventBL eventBL)
        {
            _playBL = playBL;
            _mapper = mapper;
            _theatreBL = theatreBL;
            _playTypeBL = playTypeBL;
            _eventBL = eventBL;
        }
        [HttpPost("{name}")]
        public async Task<IActionResult> Create([FromBody] PlayDTO playDTO, string name)
        {
            PlayType playType = await _playTypeBL.GetById(playDTO.Type.Id);
            Play play = _mapper.Map<Play>(playDTO);
            play.Theatre = await _theatreBL.GetByUsername(name);
            play.Active = true;
            play.Type = playType;
            await _playBL.Add(play);
            return Ok();
        }

        [HttpGet]
        public async Task<IList<Play>> GetPlays()
        {
            var plays = await _playBL.GetAll();
            return plays;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlay(int id)
        {
            //await _playBL.DeleteAsync(id);

            var currentDate = DateTime.Now;
            Play play = await _playBL.GetById(id);
            List<Event> events = (List<Event>)await _eventBL.GetAll();
            events = events.Where(e => e.PlayId == id).ToList();
            events = events.Where(e => e.DateTime > currentDate).ToList();
            events = events.Where(e => e.Active==true).ToList();
            if (events.Count==0)
            {
                play.Active = false;
                await _playBL.UpdatePlayAsync(id, play);
                return Ok();
            }
            return BadRequest("Cannot delete event because it is scheduled in the future");

        }
        


        [HttpGet("{name}")]
        public async Task<IActionResult> GePlaysByTheatre(string name)
        {
            List<Play> plays = (List<Play>)await _playBL.GetAll();
            plays = plays.Where(e => e.Theatre.User.UserName == name).ToList();
            plays = plays.Where(e => e.Active == true).ToList();
            List<PlayDTO> playsDTO = _mapper.Map<List<PlayDTO>>(plays);
            return Ok(playsDTO);
        }

        [HttpGet("{name}/filteredPlays/{playName}")]
        public async Task<IActionResult> GetFilteredPlays(string name, string? playName)
        {
            List<Play> plays = (List<Play>)await _playBL.GetAll();
            plays = plays.Where(e => e.Theatre.User.UserName == name).ToList();
            if (playName != null)
            {
            plays = plays.Where(p => p.Name.ToLower().Contains(playName.ToLower())).ToList();
            }
            List<PlayDTO> playsDTO = _mapper.Map<List<PlayDTO>>(plays);
            return Ok(playsDTO);
        }
        [Route("/api/Playtype")]
        [HttpGet]
        public async Task<IList<PlayType>> GetPlayTypes()
        {
            var plays = await _playTypeBL.GetAll();
            return plays;
        }
        [HttpPost("edit/{name}")]
        public async Task<IActionResult> Edit(string name, [FromBody] PlayDTO playDTO)
        {
            PlayType playType = await _playTypeBL.GetById(playDTO.Type.Id);
            Play play = _mapper.Map<Play>(playDTO);
            play.Theatre = await _theatreBL.GetByUsername(name);
            play.Type = playType;
            int id = playDTO.Id;
            await _playBL.UpdatePlayAsync(id, play);
            return Ok();
        }
    }
}
