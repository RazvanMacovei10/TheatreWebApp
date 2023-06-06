using AutoMapper;
using BusinessLogic.Abstract;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TheatreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheathreController : ControllerBase
    {
        private readonly ITheatreBL _theathreBL;
        private readonly IPlayBL _playBL;
        private readonly IMapper _mapper;
        public TheathreController(ITheatreBL theathreBL, IPlayBL playBL, IMapper mapper)
        {
            _theathreBL = theathreBL;
            _playBL = playBL;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetTheathres()
        {
            List<Theatre> theatres = (List<Theatre>)await _theathreBL.GetAll();
            List<TheatreDTO> theathresDTO = _mapper.Map<List<TheatreDTO>>(theatres);
            return Ok(theathresDTO);
        }
        [HttpGet("{name}")]
        public async Task<IActionResult> GetFilteredTheathres(string name)
        {
            List<Theatre> theatres = (List<Theatre>)await _theathreBL.GetAll();
            theatres = theatres.Where(t => t.Name.ToLower().Contains(name.ToLower())).ToList();
            List<TheatreDTO> theathresDTO = _mapper.Map<List<TheatreDTO>>(theatres);
            return Ok(theathresDTO);
        }
    }
}
