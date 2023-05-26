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

        public async Task<User> UpdateEventAsync(int userId, User userSent)
        {
            User userToModify = await GetById(userId);
            //    public int Id { get; set; }
            //public string UserName { get; set; }
            //public byte[] PasswordHash { get; set; }
            //public byte[] PasswordSalt { get; set; }
            //public string Email { get; set; }
            //public int RoleId { get; set; }
            //public UserRole Role { get; set; }

            userToModify.PasswordHash = userSent.PasswordHash;
            userToModify.PasswordSalt = userSent.PasswordSalt;
            userToModify.UserName = userSent.UserName;
            userToModify.Email=userSent.Email;
            userToModify.RoleId = userSent.RoleId;
            userToModify.Role = userSent.Role;
        

        await _context.SaveChangesAsync();
            return userToModify;
        }

    }
}
