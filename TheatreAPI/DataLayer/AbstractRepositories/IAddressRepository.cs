using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.AbstractRepositories
{
    public interface IAddressRepository
    {
        public Task<List<string>> GetAllCities();
    }
}
