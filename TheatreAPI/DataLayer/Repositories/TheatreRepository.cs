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
    public class TheatreRepository:ITheatreRepository
    {
        private readonly AppDbContext _context;
        public TheatreRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Theatre>> GetAll()
        {
            var results = await _context.Theatres.
                Where(x=>x.User.Active==true).
                Include(x => x.User).
                Include(x => x.User.Role)
                .Include(x => x.Address).
                Include(x => x.Events)
                .ThenInclude(y => y.Play).
            ToListAsync();

            return results;
        }
        public async Task<Theatre> GetById(int theatreId)
        {
            var result = await _context.Theatres.Include(x => x.User).Include(x=>x.User.Role)
                .Include(x => x.Address).Include(x => x.Events).Include(x=>x.Events.Select(y=>y.Play))
                .Where(e => e.Id == theatreId).FirstOrDefaultAsync();

            return result;
        }

        public async Task<Theatre> Add(Theatre theatre)
        {
            await _context.Theatres.AddAsync(theatre);
            await _context.SaveChangesAsync();
            return theatre;
        }
        public async Task<Theatre> GetByUsername(string username)
        {
            var result = await _context.Theatres.Include(x => x.User).Include(x=>x.Address)
                .Include(x=>x.User.Role).Include(x=>x.Events)
                .SingleOrDefaultAsync(x => x.User.UserName == username);

            return result;
        }

        public async Task<Theatre> UpdateTheatreAsync(int theatreId, Theatre theatreSent)
        {
            Theatre theatreToModify = new Theatre();
            theatreToModify.Id = theatreId;
            theatreToModify.Image = theatreSent.Image;
            theatreToModify.UserId = theatreSent.UserId;
            theatreToModify.Name = theatreSent.Name;
            theatreToModify.User = theatreSent.User;
            theatreToModify.Address = theatreSent.Address;
            theatreToModify.AddressId = theatreSent.AddressId;
            theatreToModify.Events = theatreSent.Events;

            await _context.SaveChangesAsync();

            return theatreToModify;
        }
    }
}
