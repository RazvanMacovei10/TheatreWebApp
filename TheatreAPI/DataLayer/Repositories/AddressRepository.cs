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
    public class AddressRepository:IAddressRepository
    {
        private readonly AppDbContext _context;
        public AddressRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<string>> GetAllCities()
        {
            var results = await _context.Addresses.Select(a=>a.City).Distinct().ToListAsync();

            return results;
        }
    }
}
