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
    public class PlayRepository:IPlayRepository
    {
        private readonly AppDbContext _context;
        public PlayRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Play>> GetAll()
        {
            var results = await _context.Plays.Include(x=>x.Theatre).Include(x=>x.Theatre.User).Include(x=>x.Type).ToListAsync();

            return results;
        }
        public async Task<Play> GetById(int playId)
        {
            var result = await _context.Plays.Where(e => e.Id == playId).Include(x => x.Theatre.User).Include(x=>x.Type).FirstOrDefaultAsync();

            return result;
        }

        public async Task<Play> Add(Play play)
        {
            await _context.Plays.AddAsync(play);
            await _context.SaveChangesAsync();
            return play;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Plays.FindAsync(id);
            if (entity == null)
            {
                throw new Exception($"{nameof(entity)} could not be found");
            }

            _context.Plays.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Play> UpdatePlayAsync(int playId,Play play)
        {
            Play playToModify=await GetById(playId);
            playToModify.Description = play.Description;
            playToModify.Theatre = play.Theatre;
            playToModify.Name = play.Name;
            playToModify.Image = play.Image;
            playToModify.Type = play.Type;
            await _context.SaveChangesAsync();
            return playToModify;
        }
    }
}
