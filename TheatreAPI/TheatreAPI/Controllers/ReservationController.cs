using AutoMapper;
using BusinessLogic.Abstract;
using Core.AbstractServices;
using Core.Services;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TheatreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationBL _reservationBL;
        private readonly IMapper _mapper;
        private readonly IUserBL _userBL;
        private readonly IEventBL _eventBL;
        public ReservationController(IReservationBL reservationBL,IMapper mapper,IUserBL userBL,IEventBL eventBL)
        {
            _reservationBL = reservationBL;
            _mapper = mapper;
            _userBL = userBL;
            _eventBL = eventBL;
            
        }
        [HttpPost("{name}/{id}")]
        public async Task<IActionResult> Create([FromBody] ReservationDTO reservationDTO, string name,int id)
        {
            Reservation reservation = new Reservation();
            Event eventModel = await _eventBL.GetById(id);
            if (reservation.NumberOfTickets <= eventModel.AvailableSeats)
            {
                eventModel.AvailableSeats=eventModel.AvailableSeats - reservationDTO.NumberOfTickets;
                await _eventBL.UpdateEventAsync(eventModel.Id, eventModel);
            }
            else
            {
                return null;
            }
            reservation.User = await _userBL.GetByUsername(name);
            reservation.NumberOfTickets = reservationDTO.NumberOfTickets;
            reservation.Event = eventModel;           
            reservation.DateTime=DateTime.Now;
            
            await _reservationBL.Add(reservation);
            return Ok();
        }
    }
}
