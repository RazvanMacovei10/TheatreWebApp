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
    public class PlayTypeRepository:IPlayTypeRepository
    {
        private readonly AppDbContext _context;
        public PlayTypeRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<PlayType>> GetAll()
        {
            var results = await _context.PlayTypes.ToListAsync();

            return results;
        }
        public async Task<PlayType> GetById(int playTypeId)
        {
            var result = await _context.PlayTypes.Where(e => e.Id == playTypeId).FirstOrDefaultAsync();

            return result;
        }

        public async Task<PlayType> Add(PlayType play)
        {
            await _context.PlayTypes.AddAsync(play);
            await _context.SaveChangesAsync();
            return play;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.PlayTypes.FindAsync(id);
            if (entity == null)
            {
                throw new Exception($"{nameof(entity)} could not be found");
            }

            _context.PlayTypes.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
