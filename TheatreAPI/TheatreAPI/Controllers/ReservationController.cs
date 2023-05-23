using AutoMapper;
using BusinessLogic.Abstract;
using BusinessLogic.BL;
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
        public ReservationController(IReservationBL reservationBL, IMapper mapper, IUserBL userBL, IEventBL eventBL)
        {
            _reservationBL = reservationBL;
            _mapper = mapper;
            _userBL = userBL;
            _eventBL = eventBL;

        }
        [HttpPost("{name}/{id}")]
        public async Task<IActionResult> Create([FromBody] ReservationDTO reservationDTO, string name, int id)
        {
            Reservation reservation = new Reservation();
            Event eventModel = await _eventBL.GetById(id);
            if (reservation.NumberOfTickets <= eventModel.AvailableSeats)
            {
                eventModel.AvailableSeats = eventModel.AvailableSeats - reservationDTO.NumberOfTickets;
                await _eventBL.UpdateEventAsync(eventModel.Id, eventModel);
            }
            else
            {
                return null;
            }
            reservation.User = await _userBL.GetByUsername(name);
            reservation.NumberOfTickets = reservationDTO.NumberOfTickets;
            reservation.Event = eventModel;
            reservation.DateTime = DateTime.Now;

            await _reservationBL.Add(reservation);
            return Ok();
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetReservationsByUser(string name)
        {
            List<Reservation> reservations = (List<Reservation>)await _reservationBL.GetAll();

            reservations = reservations.Where(e => e.User.UserName == name).ToList();
            List<NewReservation> reservations1 = new List<NewReservation>();
            foreach (var reservation in reservations)
            {
                NewReservation newReservation = new NewReservation();
                newReservation.Id = reservation.Id;
                newReservation.NumberOfTickets = reservation.NumberOfTickets;
                newReservation.User = reservation.User;
                newReservation.DateTime = reservation.DateTime;
                newReservation.EventName = reservation.Event.Play.Name;
                newReservation.EventDateTime = reservation.Event.DateTime;
                reservations1.Add(newReservation);
            }
            return Ok(reservations1);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Reservation> reservations = (List<Reservation>)await _reservationBL.GetAll();

            reservations = reservations.ToList();
            List<NewReservation> reservations1 = new List<NewReservation>();
            foreach (var reservation in reservations)
            {
                NewReservation newReservation = new NewReservation();
                newReservation.Id = reservation.Id;
                newReservation.NumberOfTickets = reservation.NumberOfTickets;
                newReservation.User = reservation.User;
                newReservation.DateTime = reservation.DateTime;
                newReservation.EventName = reservation.Event.Play.Name;
                newReservation.EventDateTime = reservation.Event.DateTime;
                reservations1.Add(newReservation);
            }
            return Ok(reservations1);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            Reservation reservation = await _reservationBL.GetById(id);
            Event eventModel = await _eventBL.GetById(reservation.EventId);

            eventModel.AvailableSeats = eventModel.AvailableSeats + reservation.NumberOfTickets;
            await _eventBL.UpdateEventAsync(eventModel.Id, eventModel);

            await _reservationBL.DeleteAsync(id);
            return Ok();
        }
    }
}
