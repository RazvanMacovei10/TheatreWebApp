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
        public async Task<Theatre> Add(Theatre theatre)
        {
            return await _theatreRepository.Add(theatre);
        }
        public async Task<Theatre> GetByUsername(string username)
        {
            var result = await _theatreRepository.GetByUsername(username);

            return result;
        }
        public async Task<Theatre> UpdateTheatreAsync(int theatreId, Theatre theatreSent)
        {
            return await _theatreRepository.UpdateTheatreAsync(theatreId, theatreSent);
        }
    }
}
