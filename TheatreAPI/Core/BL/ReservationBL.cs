using BusinessLogic.Abstract;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BL
{
    public class ReservationBL:IReservationBL
    {
        private IReservationRepository _reservationRepository { get; set; }
        public ReservationBL(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }

        public async Task<List<Reservation>> GetAll()
        {
            var results = await _reservationRepository.GetAll();
            return results;
        }

        public async Task<Reservation> GetById(int id)
        {
            var result = await _reservationRepository.GetById(id);
            return result;
        }
        public async Task<Reservation> Add(Reservation reservation)
        {
            return await _reservationRepository.Add(reservation);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _reservationRepository.DeleteAsync(id);
        }
    }
}
