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
    public class UserRepository:IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<User>> GetAll()
        {
            var results = await _context.Users.ToListAsync();

            return results;
        }
        public async Task<User> GetById(int userId)
        {
            var result=await _context.Users.Where(e=>e.Id== userId).FirstOrDefaultAsync();

            return result;
        }
    }
}
