using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;
        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Reservation>> GetAll()
        {
            var currentDate = DateTime.Now;
            var results = await _context.Reservations.
                Include(x => x.Event).
                Include(x => x.Event.Play).
                Include(x => x.User).
                Include(x => x.User.Role).
                Include(x=>x.Event.Theatre).OrderByDescending(x=>x.DateTime).
                ToListAsync();

            return results;
        }
        public async Task<Reservation> GetById(int reservationId)
        {
            var result = await _context.Reservations.Where(e => e.Id == reservationId).
                Include(x => x.Event).Include(x => x.Event.Play).
                Include(x=>x.Event.Theatre).
                Include(x => x.User).Include(x => x.User.Role).FirstOrDefaultAsync();

            return result;
        }

        public async Task<Reservation> Add(Reservation reservation)
        {
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();


                
                
                
                
            
            return reservation;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Reservations.FindAsync(id);
            if (entity == null)
            {
                throw new Exception($"{nameof(entity)} could not be found");
            }

            _context.Reservations.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
