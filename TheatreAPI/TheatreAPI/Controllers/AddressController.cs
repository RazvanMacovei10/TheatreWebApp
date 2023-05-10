using AutoMapper;
using BusinessLogic.Abstract;
using BusinessLogic.BL;
using DataLayer.DTOs;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TheatreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private IAddressBL _addressBL;
        public AddressController(IAddressBL addressBL)
        {
            _addressBL = addressBL;
        }


        [HttpGet]
        public async Task<IList<string>> GetCities()
        {
            var addresses = await _addressBL.GetAllCities();
            return addresses;
        }

    }
}
