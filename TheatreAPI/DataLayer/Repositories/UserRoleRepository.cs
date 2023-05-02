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
    public class UserRoleRepository:IUserRoleRepository
    {
        private readonly AppDbContext _context;
        public UserRoleRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<UserRole> GetById(int id)
        {
            var result = await _context.UserRoles.Where(e => e.Id == id).FirstOrDefaultAsync();

            return result;
        }
    }
}
