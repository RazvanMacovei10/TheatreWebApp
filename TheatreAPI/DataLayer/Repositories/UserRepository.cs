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
        
        public async Task<User>Add (User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
        public async Task<bool> UserByEmailExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email.ToLower());
        }

        public async Task<User> GetByUsername(string username)
        {
            var result = await _context.Users.Include(x=>x.Role).SingleOrDefaultAsync(x => x.UserName == username);

            return result;
        }

    }
}
