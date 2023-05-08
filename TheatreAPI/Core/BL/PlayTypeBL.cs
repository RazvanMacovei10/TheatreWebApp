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
    public class PlayTypeBL:IPlayTypeBL
    {
        private IPlayTypeRepository _playTypeRepository { get; set; }
        public PlayTypeBL(IPlayTypeRepository playTypeRepository)
        {
            _playTypeRepository = playTypeRepository;
        }

        public async Task<List<PlayType>> GetAll()
        {
            var results = await _playTypeRepository.GetAll();
            return results;
        }

        public async Task<PlayType> GetById(int id)
        {
            var result = await _playTypeRepository.GetById(id);
            return result;
        }
        public async Task<PlayType> Add(PlayType play)
        {
            return await _playTypeRepository.Add(play);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _playTypeRepository.DeleteAsync(id);
        }
    }
}
