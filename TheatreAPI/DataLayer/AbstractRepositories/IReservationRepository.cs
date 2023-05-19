using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface IReservationRepository
    {
        public Task<List<Reservation>> GetAll();
        public Task<Reservation> GetById(int reservationId);
        public Task<Reservation> Add(Reservation reservation);
        Task<bool> DeleteAsync(int id);
    }
}
