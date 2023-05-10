using BusinessLogic.Abstract;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BL
{
    public class AddressBL:IAddressBL
    {
        private IAddressRepository _addressRepository { get; set; }
        public AddressBL(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<List<string>> GetAllCities()
        {
            var results = await _addressRepository.GetAllCities();
            return results;
        }
    }
}
