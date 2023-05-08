using AutoMapper;
using BusinessLogic.Abstract;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TheatreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayController : ControllerBase
    {
        private readonly IPlayBL _playBL;
        private readonly IPlayTypeBL _playTypeBL;
        private readonly IMapper _mapper;
        private readonly ITheatreBL _theatreBL;
        public PlayController(IPlayBL playBL, IMapper mapper, ITheatreBL theatreBL, IPlayTypeBL playTypeBL)
        {
            _playBL = playBL;
            _mapper = mapper;
            _theatreBL = theatreBL;
            _playTypeBL = playTypeBL;
        }
        [HttpPost("{name}")]
        public async Task<IActionResult> Create([FromBody] PlayDTO playDTO, string name)
        {
            PlayType playType = await _playTypeBL.GetById(playDTO.Type.Id);
            Play play = _mapper.Map<Play>(playDTO);
            play.Theatre = await _theatreBL.GetByUsername(name);
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
            await  _playBL.DeleteAsync(id);
            return Ok();
        }


        [HttpGet("{name}")]
        public async Task<IActionResult> GetEventsByTheatreId(string name)
        {
            List<Play> plays = (List<Play>)await _playBL.GetAll();
            plays = plays.Where(e => e.Theatre.User.UserName == name).ToList();
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
    }
}
