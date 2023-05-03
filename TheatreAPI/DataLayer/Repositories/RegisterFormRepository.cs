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
    public class RegisterFormRepository:IRegisterFormRepository
    {
        private readonly AppDbContext _context;
        public RegisterFormRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<RegisterForm>> GetAll()
        {
            var results = await _context.RegisterForms.Include(x=>x.Address).ToListAsync();

            return results;
        }
        public async Task<RegisterForm> GetById(int registerFormId)
        {
            var result = await _context.RegisterForms.Include(x=>x.Address).Where(e => e.Id == registerFormId).FirstOrDefaultAsync();

            return result;
        }

        public async Task<RegisterForm> Add(RegisterForm registerForm)
        {
            await _context.RegisterForms.AddAsync(registerForm);
            await _context.SaveChangesAsync();
            return registerForm;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.RegisterForms.FindAsync(id);
            if (entity == null)
            {
                throw new Exception($"{nameof(entity)} could not be found");
            }

            _context.RegisterForms.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
