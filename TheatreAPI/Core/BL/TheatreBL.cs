using BusinessLogic.Abstract;
using DataLayer.AbstractRepositories;
using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.BL
{
    public class TheatreBL:ITheatreBL
    {
        private ITheatreRepository _theatreRepository { get; set; }
        public TheatreBL(ITheatreRepository theatreRepository)
        {
            _theatreRepository = theatreRepository;
        }

        public async Task<List<Theatre>> GetAll()
        {
            var results = await _theatreRepository.GetAll();
            return results;
        }

        public async Task<Theatre> GetById(int id)
        {
            var result = await _theatreRepository.GetById(id);
            return result;
        }
        public void Add(Theatre theatre)
        {
            _theatreRepository.Add(theatre);
        }
    }
}
