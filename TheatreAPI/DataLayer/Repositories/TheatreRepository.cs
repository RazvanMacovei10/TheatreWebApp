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
            var results = await _context.Theatres.ToListAsync();

            return results;
        }
        public async Task<Theatre> GetById(int theatreId)
        {
            var result = await _context.Theatres.Where(e => e.Id == theatreId).FirstOrDefaultAsync();

            return result;
        }

        public async Task<Theatre> Add(Theatre theatre)
        {
            await _context.Theatres.AddAsync(theatre);
            await _context.SaveChangesAsync();
            return theatre;
        }
    }
}
