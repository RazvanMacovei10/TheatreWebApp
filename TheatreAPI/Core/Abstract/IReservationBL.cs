using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Abstract
{
    public interface IReservationBL
    {
        public Task<List<Reservation>> GetAll();
        public Task<Reservation> GetById(int id);
        public Task<Reservation> Add(Reservation reservation);
        public Task<bool> DeleteAsync(int id);
    }
}
