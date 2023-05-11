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
    public class EventRepository:IEventRepository
    {
        private readonly AppDbContext _context;
        public EventRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Event>> GetAll()
        {
            var results = await _context.Events.Include(x => x.Theatre).Include(x => x.Play).Include(x => x.Theatre.User).
                ToListAsync();

            return results;
        }
        public async Task<List<Event>> GetAllFiltered(int priceFrom,int priceTo, string city, string name)
        {
            if(city==null && name==null)
            {
                var results = await _context.Events.Include(x => x.Theatre).Include(x => x.Play).Include(x => x.Theatre.User)
                .Where(x => x.Price >= priceFrom && x.Price <= priceTo)
                .ToListAsync();
                return results;
            }
            else
            if(city==null)
            {
                var results = await _context.Events.Include(x => x.Theatre).Include(x => x.Play).Include(x => x.Theatre.User)
                .Where(x => x.Play.Name.Contains(name))
                .Where(x => x.Price >= priceFrom && x.Price <= priceTo)
                .ToListAsync();
                return results;
            }
            else
            if(name==null)
            {
                var results = await _context.Events.Include(x => x.Theatre).Include(x => x.Play).Include(x => x.Theatre.User)
                .Where(x => x.Theatre.Address.City.Contains(city))
                .Where(x => x.Price >= priceFrom && x.Price <= priceTo)
                .ToListAsync();
                return results;

            }
            else 
            {                
                var results = await _context.Events.Include(x => x.Theatre).Include(x => x.Play).Include(x => x.Theatre.User)
                .Where(x => x.Theatre.Address.City.Contains(city))
                .Where(x => x.Play.Name.Contains(name))
                .Where(x => x.Price >= priceFrom && x.Price <= priceTo)
                .ToListAsync();
                return results;
            }
        }
        public async Task<Event> GetById(int eventId)
        {
            var result = await _context.Events.Where(e => e.Id == eventId).
                Include(x => x.Theatre).Include(x => x.Play).
                Include(x=>x.Theatre.User).FirstOrDefaultAsync();

            return result;
        }

        public async Task<Event> Add(Event eventAdded)
        {
            await _context.Events.AddAsync(eventAdded);
            await _context.SaveChangesAsync();
            return eventAdded;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Events.FindAsync(id);
            if (entity == null)
            {
                throw new Exception($"{nameof(entity)} could not be found");
            }

            _context.Events.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
